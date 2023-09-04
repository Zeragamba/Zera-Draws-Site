import crypto from 'node:crypto'

import { ImageData } from './ImageData'

export function buildImageData(overrides: Partial<ImageData>): ImageData {
  return {
    id: crypto.randomUUID(),
    position: 0,
    filename: 'example',
    srcs: {
      full: 'https://example.test/images/new/full.png',
    },
    ...overrides,
  }
}
