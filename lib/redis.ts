import Redis from 'ioredis';

/**
 * Singleton Redis client using ioredis.
 *
 * Uses a standard TCP connection so it's fully compatible with a standard
 * Redis instance running in Docker or any hosted Redis provider.
 *
 * Usage: import { redis } from '@/lib/redis';
 *        const value = await redis?.get('key');
 *
 * If REDIS_URL is not set (e.g. local dev without Redis),
 * `redis` is null and all callers must guard with: if (!redis) { ... }
 */

let _redis: Redis | null = null;

const url = process.env.REDIS_URL;

if (url && url !== 'your_redis_url') {
  _redis = new Redis(url);
} else {
  console.warn(
    '[Redis] REDIS_URL not configured. ' +
    'Rate limiting and caching are disabled. ' +
    'Add real credentials to .env.local or use docker-compose to enable.'
  );
}

export const redis: Redis | null = _redis;
