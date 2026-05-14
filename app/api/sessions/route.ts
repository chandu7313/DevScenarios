import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import ChatSession from '@/models/ChatSession';
import { redis } from '@/lib/redis';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic';

/** Session cache TTL: 2 hours. */
const SESSION_TTL_SECONDS = 7200;

/** Builds the Redis cache key for a session. */
function buildSessionCacheKey(sessionId: string): string {
  return `session:${sessionId}`;
}

// ── GET ───────────────────────────────────────────────────────────────────────
/**
 * Fetch session history for a given sessionId + scenarioSlug.
 *
 * Read-through cache strategy:
 *   1. Check Redis (~1ms)
 *   2. On miss: query MongoDB, populate Redis for future reads
 *   3. Redis null or error: fall through to MongoDB silently
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');
  const scenarioSlug = searchParams.get('scenarioSlug');

  if (!sessionId || !scenarioSlug) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const cacheKey = buildSessionCacheKey(sessionId);

  // ── Cache READ ──────────────────────────────────────────────────────────────
  if (redis) {
    try {
      const cached = await redis.get(cacheKey);
      if (cached) {
        const parsed = typeof cached === 'string' ? JSON.parse(cached) : cached;
        return NextResponse.json(parsed);
      }
    } catch (redisError) {
      console.warn('[Sessions] Redis read failed, falling through to MongoDB:', redisError);
    }
  }
  // ── End Cache READ ──────────────────────────────────────────────────────────

  try {
    await connectDB();
    const session = await ChatSession.findOne({ sessionId, scenarioSlug }).lean();
    const result = session ?? { messages: [] };

    // ── Cache WRITE ─────────────────────────────────────────────────────────
    if (redis) {
      try {
        await redis.setex(cacheKey, SESSION_TTL_SECONDS, JSON.stringify(result));
      } catch (redisError) {
        console.warn('[Sessions] Redis write failed:', redisError);
      }
    }
    // ── End Cache WRITE ─────────────────────────────────────────────────────

    return NextResponse.json(result);
  } catch (error) {
    console.error('[Sessions] GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// ── POST ──────────────────────────────────────────────────────────────────────
/**
 * Create or retrieve a session document in MongoDB.
 *
 * Write strategy:
 *   1. Write to MongoDB first (source of truth).
 *   2. Invalidate Redis so the next GET re-fetches fresh data.
 *      We delete rather than update to avoid any dual-write inconsistency.
 */
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { sessionId, scenarioSlug } = await req.json();

    if (!scenarioSlug) {
      return NextResponse.json({ error: 'Missing scenario slug' }, { status: 400 });
    }

    const id = sessionId ?? uuidv4();

    let session = await ChatSession.findOne({ sessionId: id, scenarioSlug });

    if (!session) {
      session = await ChatSession.create({
        sessionId: id,
        scenarioSlug,
        messages: [],
      });
    }

    // ── Cache INVALIDATION ──────────────────────────────────────────────────
    /**
     * Delete the stale Redis entry so the next GET re-fetches from MongoDB.
     * A failed DEL is non-fatal — stale data will expire naturally on TTL.
     */
    if (redis) {
      try {
        await redis.del(buildSessionCacheKey(id));
      } catch (redisError) {
        console.warn('[Sessions] Redis invalidation failed:', redisError);
      }
    }
    // ── End Cache INVALIDATION ──────────────────────────────────────────────

    return NextResponse.json(session);
  } catch (error) {
    console.error('[Sessions] POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
