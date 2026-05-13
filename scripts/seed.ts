import mongoose from 'mongoose';
import * as dotenvx from '@dotenvx/dotenvx';
import { SCENARIOS } from '../lib/scenarios-data';
import Scenario from '../models/Scenario';

dotenvx.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

/**
 * Clears all Redis scenario cache keys after a successful seed.
 *
 * Uses SCAN instead of KEYS to avoid blocking the Redis server —
 * KEYS is O(N) and can cause latency spikes in production.
 *
 * If UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN are not set,
 * this step is skipped silently.
 */
async function clearScenarioCache(): Promise<void> {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    console.warn('[Cache] Redis env vars not set — skipping cache purge.');
    return;
  }

  try {
    // Lazy import so the script doesn't fail if @upstash/redis is missing.
    const { Redis } = await import('@upstash/redis');
    const redisClient = new Redis({ url: redisUrl, token: redisToken });

    let cursor = 0;
    const keysToDelete: string[] = [];

    // Iterate with SCAN in pages of 100 until the cursor returns 0 (full cycle).
    do {
      const [nextCursor, keys] = await redisClient.scan(cursor, {
        match: 'cache:scenarios:*',
        count: 100,
      });
      cursor = Number(nextCursor);
      keysToDelete.push(...(keys as string[]));
    } while (cursor !== 0);

    if (keysToDelete.length > 0) {
      await redisClient.del(...keysToDelete);
      console.log(`[Cache] Cleared ${keysToDelete.length} scenario cache key(s) from Redis.`);
    } else {
      console.log('[Cache] No scenario cache keys found in Redis.');
    }
  } catch (error) {
    // Non-fatal: the API will still serve data from MongoDB.
    console.warn('[Cache] Redis purge failed (non-fatal):', error);
  }
}

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI as string);
    console.log('Connected.');

    console.log('Cleaning existing scenarios...');
    await Scenario.deleteMany({});
    console.log('Cleaned.');

    console.log(`Seeding ${SCENARIOS.length} scenarios...`);
    await Scenario.insertMany(SCENARIOS);
    console.log('Seeding complete.');

    await mongoose.connection.close();
    console.log('MongoDB connection closed.');

    // Purge stale Redis caches so the API serves the fresh seed data.
    await clearScenarioCache();

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
