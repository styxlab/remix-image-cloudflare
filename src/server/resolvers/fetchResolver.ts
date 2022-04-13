import { RemixImageError } from '../types/error'
import type { MimeType } from '../types/file'
import type { Resolver } from '../types/resolver'

export type { Resolver }

export const fetchResolver: Resolver = async (_asset, url) => {
  const imgRequest = new Request(url, {
    headers: {
      accept: 'image/*',
    },
    //cf: {
    //  cacheTtl: 60,
    //  cacheEverything: true,
    //},
  })

  const imageResponse = await fetch(imgRequest)
  //console.log('fetch', imageResponse.status)

  if (!imageResponse.ok) {
    throw new RemixImageError('Failed to fetch image!')
  }

  const arrBuff = await imageResponse.arrayBuffer()
  //console.log('buffer.length', arrBuff.byteLength)

  if (!arrBuff || arrBuff.byteLength < 2) {
    throw new RemixImageError('Invalid image retrieved from resolver!')
  }

  const buffer = new Uint8Array(arrBuff)
  const contentType = imageResponse.headers.get('content-type')! as MimeType

  return {
    buffer,
    contentType,
    shouldTransform: true,
  }
}
