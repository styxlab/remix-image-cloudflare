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
  rewrite: null,
}

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request)
}

//const rewriteAssetUrl = (url: string) => {
//  const parsed = new URL(url)
//  if (parsed.host === 'assets.blogody.io' && parsed.pathname.startsWith('/image')) {
//    parsed.host = SUPABASE_STORAGE_URL
//    parsed.pathname = SUPABASE_STORAGE_PATH + parsed.pathname.substr(6)
//    return parsed.toString()
//  }
//  return url
//}
