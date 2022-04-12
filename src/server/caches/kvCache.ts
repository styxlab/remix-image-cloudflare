import { Cache, type CacheConfig } from '../types/cache'

export class KVCache extends Cache {
  config: CacheConfig
  cache: KVNamespace | null | undefined

  constructor(config: Partial<CacheConfig> | null | undefined = {}) {
    super()

    this.config = {
      ttl: 24 * 60 * 60,
      tbd: 365 * 24 * 60 * 60,
      ...config,
    }

    this.cache = config?.namespace
  }

  async get(key: string): Promise<ArrayBuffer | null> {
    return (
      this.cache?.get(key, {
        type: 'arrayBuffer',
        //cacheTtl: this.config.ttl,
      }) ?? null
    )
  }

  async put(key: string, resultImg: ArrayBuffer): Promise<void> {
    this.cache?.put(key, resultImg, { expirationTtl: this.config.ttl })
  }
}
