export interface CacheConfig {
  /**
   * KV namespace
   */
  namespace?: KVNamespace | null
  /**
   * Time To Live: how long a key should remain in the cache
   */
  ttl: number
  /**
   * Time Before Deletion: how long a key should remain in the cache after expired (ttl)
   */
  tbd: number
}

export enum CacheStatus {
  /**
   * The cache contains the key and it has not yet expired
   */
  HIT = 'hit',
  /**
   * The cache contains the key but it has expired
   */
  STALE = 'stale',
  /**
   * The cache does not contain the key
   */
  MISS = 'miss',
}

export abstract class Cache {
  abstract config: CacheConfig

  abstract get(key: string): Promise<ArrayBuffer | null>

  abstract put(key: string, resultImg: ArrayBuffer): Promise<void>
}
