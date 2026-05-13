import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import ChatSession from '@/models/ChatSession';
import { getGeminiModel, buildSystemPrompt } from '@/lib/gemini';
import { redis } from '@/lib/redis';

export const dynamic = 'force-dynamic';

/** Maximum chat requests allowed per IP per minute. */
const RATE_LIMIT = 20;
/** Rate-limit window duration in seconds. */
const WINDOW_SECONDS = 60;

/**
 * Applies a sliding-window rate limit using Redis INCR + EXPIRE.
 *
 * Why INCR+EXPIRE and not sorted sets?
 *   - INCR is atomic and O(1) — no race conditions.
 *   - EXPIRE is set only when count === 1, so the 60s window resets cleanly.
 *
 * Fails open: if Redis is null (not configured) or throws, the request is allowed.
 *
 * @returns { allowed: boolean; remaining: number }
 */
async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
  if (!redis) return { allowed: true, remaining: RATE_LIMIT };

  const key = `ratelimit:chat:${ip}`;
  try {
    const count = await redis.incr(key);
    if (count === 1) {
      // Set TTL only on the first request so the window is fixed, not sliding per-request.
      await redis.expire(key, WINDOW_SECONDS);
    }
    const remaining = Math.max(0, RATE_LIMIT - count);
    return { allowed: count <= RATE_LIMIT, remaining };
  } catch (redisError) {
    console.error('[RateLimit] Redis error — failing open:', redisError);
    return { allowed: true, remaining: RATE_LIMIT };
  }
}

export async function POST(req: NextRequest) {
  // ── Rate Limiting ────────────────────────────────────────────────────────
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1';

  const { allowed, remaining } = await checkRateLimit(ip);

  if (!allowed) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please wait a minute.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': String(RATE_LIMIT),
          'X-RateLimit-Remaining': '0',
          'Retry-After': String(WINDOW_SECONDS),
        },
      }
    );
  }
  // ── End Rate Limiting ────────────────────────────────────────────────────

  try {
    await connectDB();
    const { sessionId, scenarioSlug, message, history, scenarioContext } = await req.json();

    if (!message || !scenarioSlug || !sessionId) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const model = getGeminiModel();
    const systemPrompt = buildSystemPrompt(
      scenarioContext.title,
      scenarioContext.problem,
      scenarioContext.realWorldExamples
    );

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        {
          role: 'model',
          parts: [{
            text: `Understood. I am ready to mentor you on the ${scenarioContext.title} scenario as a senior staff engineer.`
          }],
        },
        ...history.map((msg: { role: string; content: string }) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        })),
      ],
    });

    const result = await chat.sendMessageStream(message);

    /** Stream Gemini tokens to the client, then persist the full exchange to MongoDB. */
    const stream = new ReadableStream({
      async start(controller) {
        let fullResponse = '';
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          fullResponse += chunkText;
          controller.enqueue(new TextEncoder().encode(chunkText));
        }

        // Persist after the stream completes — non-blocking for the client.
        try {
          await ChatSession.findOneAndUpdate(
            { sessionId, scenarioSlug },
            {
              $push: {
                messages: [
                  { role: 'user', content: message, timestamp: new Date() },
                  { role: 'assistant', content: fullResponse, timestamp: new Date() },
                ],
              },
            },
            { upsert: true }
          );
        } catch (dbError) {
          console.error('[Chat] Failed to save to DB:', dbError);
        }

        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'X-RateLimit-Limit': String(RATE_LIMIT),
        'X-RateLimit-Remaining': String(remaining),
      },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('[Chat] API Error:', error);
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
}
