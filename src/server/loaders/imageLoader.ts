import { redirect } from '@remix-run/server-runtime'
import mimeFromBuffer from 'mime-tree'
import { MimeType } from '../types/file'
import { ImageFit, ImagePosition, type TransformOptions } from '../types/image'
import { RemixImageError, UnsupportedImageError } from '../types/error'
import type { AssetLoader } from '../types/loader'
import { imageResponse, textResponse } from '../utils/response'
import { decodeQuery, decodeTransformQuery, parseURL } from '../utils/url'

export const imageLoader: AssetLoader = async (
  {
    selfUrl,
    cache = null,
    resolver = null,
    transformer = null,
    useFallbackFormat = true,
    fallbackFormat = MimeType.JPEG,
    defaultOptions = {},
    redirectOnFail = false,
    skipFormats = new Set([MimeType.SVG]),
    basePath = 'public',
    rewrite = null,
  },
  request
) => {
  const reqUrl = parseURL(request.url)
  let src: string | null = null

  try {
    if (!selfUrl) {
      throw new RemixImageError('selfUrl is required in RemixImage loader config!', 500)
    }
    if (!resolver) {
      throw new RemixImageError('resolver is required in RemixImage loader config!', 500)
    }

    src = decodeQuery(reqUrl.searchParams, 'src')

    if (!src) {
      throw new RemixImageError('An image URL must be provided!', 400)
    }
    try {
      src = decodeURI(src)
    } catch (error) {
      throw new RemixImageError('An invalid image URL was provided!', 400)
    }

    const decodedQuery = decodeTransformQuery(reqUrl.search)
    const transformOptions: TransformOptions = {
      fit: ImageFit.CONTAIN,
      position: ImagePosition.CENTER,
      background: [0x00, 0x00, 0x00, 0x00],
      quality: 80,
      compressionLevel: 9,
      loop: 0,
      delay: 100,
      blurRadius: null,
      rotate: null,
      flip: null,
      ...defaultOptions,
      ...decodedQuery,
    } as TransformOptions

    const assetUrl = parseURL(src, selfUrl)

    if (!transformOptions.width) {
      throw new RemixImageError('A width is required!', 400)
    }
    if (transformOptions.width && transformOptions.width > 8000) {
      throw new RemixImageError('Requested Image too large!', 406)
    }
    if (transformOptions.height && transformOptions.height > 8000) {
      throw new RemixImageError('Requested Image too large!', 406)
    }

    const cacheKey = reqUrl.search
    let isNewImage = true
    let shouldTransform = true
    let loadedImg: Uint8Array | undefined
    let resultImg: Uint8Array | undefined
    let inputContentType: MimeType | undefined
    let outputContentType: MimeType | undefined

    if (cache) {
      const cacheValue = await cache.get(cacheKey)

      if (cacheValue) {
        console.log(`Retrieved image [${cacheKey}] from cache.`)
        isNewImage = false
        shouldTransform = false

        loadedImg = new Uint8Array(cacheValue)
        inputContentType = mimeFromBuffer(loadedImg)
      }
    }

    if (!loadedImg) {
      const start = new Date().getTime()
      rewrite = rewrite ?? ((url) => url)
      const res = await resolver(src, rewrite(assetUrl.toString()), transformOptions, basePath)
      const end = new Date().getTime()
      console.log(`Fetched image [${cacheKey}] directly using resolver: ${resolver.name}. Took ${end - start}ms.`)
      isNewImage = true

      shouldTransform = res.shouldTransform
      loadedImg = res.buffer
      inputContentType = res.contentType
    }

    if (!loadedImg || !inputContentType) {
      throw new RemixImageError('Failed to transform requested image!', 500)
    }

    if (!outputContentType) {
      outputContentType = inputContentType
    }

    if (!shouldTransform || skipFormats?.has(inputContentType)) {
      resultImg = loadedImg
    } else if (transformer != null) {
      let curTransformer = transformer

      if (!curTransformer.supportedOutputs.has(outputContentType)) {
        if (useFallbackFormat && curTransformer.supportedOutputs.has(fallbackFormat)) {
          console.error(
            `Transformer does not allow this output content type: ${outputContentType}! Falling back to mime type: ${fallbackFormat}`
          )
          outputContentType = fallbackFormat
        } else {
          throw new UnsupportedImageError(`Transformer does not allow this output content type: ${outputContentType}!`)
        }
      }

      resultImg = await curTransformer.transform(
        {
          url: assetUrl.toString(),
          data: loadedImg,
          contentType: inputContentType!,
        },
        {
          ...transformOptions,
          contentType: outputContentType!,
        }
      )
      console.log(`Successfully transformed image using transformer: ${curTransformer.name}.`)
    }

    if (!resultImg) {
      throw new RemixImageError('Failed to transform requested image!', 500)
    }

    if (isNewImage && cache) {
      await cache.put(cacheKey, resultImg.buffer)
    }

    return imageResponse(
      resultImg,
      200,
      outputContentType,
      cache ? `private, max-age=${cache.config.ttl}, max-stale=${cache.config.tbd}` : `public, max-age=${60 * 60 * 24 * 365}`
    )
  } catch (error: any) {
    console.error('RemixImage loader error:', error?.message)
    console.error(error)

    if (redirectOnFail && src) {
      return redirect(src)
    }

    if (error instanceof RemixImageError) {
      return textResponse(error.errorCode || 500, error.message)
    } else {
      return textResponse(500, 'RemixImage encountered an unknown error!')
    }
  }
}
