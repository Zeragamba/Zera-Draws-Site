import { useQueryClient } from '@tanstack/react-query'

import { errorHandler, ImageData, ImageQueries } from '../index'

export interface ImagePreloaderProps {
  image: ImageData
  size?: string
}

export type ImagePreloader = (options: ImagePreloaderProps) => void

export function useImagePreloader(): ImagePreloader {
  const queryClient = useQueryClient()

  return ({ image, size = 'high' }) => {
    const src = image.srcs[size] || image.srcs.full

    queryClient.prefetchQuery(ImageQueries.get(src))
      .catch(errorHandler)
  }
}
