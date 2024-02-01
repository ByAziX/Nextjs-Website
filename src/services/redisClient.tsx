// redisClient.ts
import { createClient, RedisClientType } from 'redis';

class MemoryCache {
  private cache = new Map<string, string>();

  get(key: string): string | null {
    return this.cache.get(key) || null;
  }

  set(key: string, value: string, ttl: number = 0): void {
    this.cache.set(key, value);
    if (ttl > 0) {
      setTimeout(() => this.cache.delete(key), ttl * 1000);
    }
  }
}

const redisClient: RedisClientType = createClient({
  url: 'redis://localhost:6380'
});
const memoryCache = new MemoryCache();

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
})();

const cache = {
  async get(key: string): Promise<string | null> {
    try {
      if (await redisClient.isOpen()) {
        const value = await redisClient.get(key);
        if (value) return value;
      }
    } catch (err) {
      console.warn('Redis get error, using memory cache as fallback.', err);
    }
    return memoryCache.get(key);
  },
  async set(key: string, value: string, ttl: number = 60): Promise<void> {
    try {
      if (await redisClient.isOpen()) {
        await redisClient.set(key, value, { EX: ttl });
        return;
      }
    } catch (err) {
      console.warn('Redis set error, using memory cache as fallback.', err);
    }
    memoryCache.set(key, value, ttl);
  }
};

export default cache;
