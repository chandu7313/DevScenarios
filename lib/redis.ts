import { Redis } from '@upstash/redis';

/**
 * Singleton Redis client using the Upstash REST driver.
 *
 * Uses the REST API (not TCP) so it is safe for:
 *   - Vercel serverless functions (no persistent connections)
 *   - Vercel Edge runtime
 *   - Local development (falls back gracefully when not configured)
 *
 * Usage: import { redis } from '@/lib/redis';
 *        const value = await redis.get('key');
 *
 * If UPSTASH_REDIS_REST_URL / TOKEN are not set (e.g. local dev without Redis),
 * `redis` is null and all callers must guard with: if (!redis) { ... }
 */

let _redis: Redis | null = null;

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

if (
  url &&
  token &&
  url !== 'your_upstash_redis_rest_url' &&
  token !== 'your_upstash_redis_rest_token'
) {
  _redis = new Redis({ url, token });
} else {
  console.warn(
    '[Redis] UPSTASH_REDIS_REST_URL / TOKEN not configured. ' +
    'Rate limiting and caching are disabled. ' +
    'Add real credentials to .env.local to enable.'
  );
}

export const redis: Redis | null = _redis;
