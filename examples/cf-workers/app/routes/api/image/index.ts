import type { LoaderFunction } from '@remix-run/cloudflare'
import { imageLoader, KVCache, kvResolver, cloudflareResolver, type Resolver } from 'remix-image-cloudflare/server'

const whitelistedDomains = new Set([SELF_URL, 'images.unsplash.com', 'assets.blogody.com', 'i.picsum.photos'])

export const myResolver: Resolver = async (asset, url, options, basePath) => {
  if (asset.startsWith('/') && (asset.length === 1 || asset[1] !== '/')) {
    return kvResolver(asset, url, options, basePath)
  } else {
    if (!whitelistedDomains.has(new URL(url).host)) {
      throw new Error('Domain not allowed!')
    }

    return cloudflareResolver(asset, url, options, basePath)
  }
}

const config = {
  selfUrl: SELF_URL,
  cache: new KVCache({ namespace: IMAGE_KV }),
  resolver: myResolver,
  transformer: null,
}

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request)
}
