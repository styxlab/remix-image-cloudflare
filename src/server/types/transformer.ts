import type { MimeType } from './file'
import type { TransformOptions } from './image'

export type Transformer = {
  name: string
  supportedInputs: Set<MimeType>
  supportedOutputs: Set<MimeType>
  transform: (
    input: {
      url: string
      data: Uint8Array
      contentType: MimeType
    },
    output: TransformOptions
  ) => Promise<Uint8Array>
}
