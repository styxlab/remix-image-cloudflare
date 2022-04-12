import { ImageFit } from '../types/image'
import type { MimeType } from '../types/file'
import type { Resolver } from '../types/resolver'

const fitMap = {
  [ImageFit.CONTAIN]: 'contain',
  [ImageFit.COVER]: 'cover',
  [ImageFit.FILL]: 'contain',
  [ImageFit.INSIDE]: 'pad',
  [ImageFit.OUTSIDE]: 'cover',
}

export const cloudflareResolver: Resolver = async (_asset, url, { width, height, fit = ImageFit.CONTAIN, quality, position }) => {
  const imgRequest = new Request(url, {
    headers: {
      accept: 'image/*',
    },
  })

  const imageResponse = await fetch(imgRequest, {
    cf: {
      image: {
        width,
        height,
        fit: fitMap[fit] as any,
        quality,
        gravity: position,
        format: 'webp',
      },
    },
  })

  console.log('cloudflareResolver', imageResponse.status)

  const arrBuff = await imageResponse.arrayBuffer()

  const buffer = new Uint8Array(arrBuff)
  const contentType = imageResponse.headers.get('content-type')! as MimeType

  return {
    buffer,
    contentType,
  }
}
