import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Scenario from '@/models/Scenario';
import { redis } from '@/lib/redis';

export const dynamic = 'force-dynamic';

/** Cache TTL for scenario list queries: 24 hours. */
const CACHE_TTL_SECONDS = 86400;

/**
 * Builds the Redis cache key for a given domain filter.
 * Each domain value gets its own key so filters are cached independently.
 */
function buildCacheKey(domain: string): string {
  return `cache:scenarios:${domain}`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get('domain') ?? 'all';
  const search = searchParams.get('search') ?? '';

  // Skip caching for search queries — too many unique combinations to be useful.
  const isCacheable = !search && !!redis;
  const cacheKey = buildCacheKey(domain);

  // ── Cache READ ────────────────────────────────────────────────────────────
  if (isCacheable) {
    try {
      const cached = await redis!.get<string>(cacheKey);
      if (cached) {
        const parsed = typeof cached === 'string' ? JSON.parse(cached) : cached;
        return NextResponse.json(parsed, { headers: { 'X-Cache': 'HIT' } });
      }
    } catch (redisError) {
      // Redis unavailable — fall through to MongoDB silently.
      console.warn('[Scenarios] Redis read failed, falling through to MongoDB:', redisError);
    }
  }
  // ── End Cache READ ────────────────────────────────────────────────────────

  try {
    await connectDB();

    const query: Record<string, unknown> = {};

    if (domain && domain !== 'all') {
      query.domain = domain;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    const scenarios = await Scenario.find(query).sort({ createdAt: -1 }).lean();

    // ── Cache WRITE ───────────────────────────────────────────────────────────
    if (isCacheable) {
      try {
        /**
         * setex = SET + EXPIRE in a single atomic command.
         * Avoids the TOCTOU race where the key exists briefly without a TTL.
         */
        await redis!.setex(cacheKey, CACHE_TTL_SECONDS, JSON.stringify(scenarios));
      } catch (redisError) {
        // Write failure is non-fatal; MongoDB result is still returned.
        console.warn('[Scenarios] Redis write failed:', redisError);
      }
    }
    // ── End Cache WRITE ───────────────────────────────────────────────────────

    return NextResponse.json(scenarios, { headers: { 'X-Cache': 'MISS' } });
  } catch (error) {
    console.error('[Scenarios] API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
