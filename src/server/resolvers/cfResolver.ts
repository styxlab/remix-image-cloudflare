import { ImageFit, RemixImageError } from '../types'
import type { MimeType, Resolver } from '../types'
export type { Resolver }

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
        format: 'avif',
      },
    },
  })

  if (imageResponse.status > 250) {
    throw new RemixImageError('cloudflareResolver failed with status ' + imageResponse.status)
  }

  imageResponse.headers.forEach((value, key) => console.log(key, value))

  const arrBuff = await imageResponse.arrayBuffer()

  const buffer = new Uint8Array(arrBuff)
  const contentType = imageResponse.headers.get('content-type')! as MimeType

  return {
    buffer,
    contentType,
    shouldTransform: false,
  }
}
