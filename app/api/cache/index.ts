const CACHE_TTL_MS = 10 * 60 * 1000;

export class Cache {
  private data: Record<string, { data: unknown; expiresAt: number }> = {};

  get<T>(key: string): T | null {
    const entry = this.data[key];
    if (entry && Date.now() < entry.expiresAt) return entry.data as T;
    return null;
  }

  set(key: string, data: unknown): void {
    this.data[key] = {
      data,
      expiresAt: Date.now() + CACHE_TTL_MS,
    };
  }
}

const globalForCache = globalThis as unknown as { cache: Cache };
const instance = globalForCache.cache instanceof Cache ? globalForCache.cache : new Cache();
globalForCache.cache = instance;
export const cache = instance;

