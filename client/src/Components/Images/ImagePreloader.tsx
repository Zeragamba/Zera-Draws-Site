import { useQueryClient } from '@tanstack/react-query'

import { ImageQueries, useImagePreload } from './ImageApi/ImageQueries'
import { ImageData } from './ImageData'
import { errorHandler } from '../../Lib/ErrorHandler'

interface PostPreloaderProps {
  image: ImageData
  size?: string
}

export type ImagePreloader = (options: PostPreloaderProps) => void

export const ImagePreloader: ImagePreloader = ({
  image,
  size = 'high',
}) => {
  const src = image.srcs[size] || image.srcs.full
  useImagePreload(src)
  return null
}

export function useImagePreloader(): ImagePreloader {
  const queryClient = useQueryClient()

  return ({ image, size = 'high' }) => {
    const src = image.srcs[size] || image.srcs.full
    
    queryClient.prefetchQuery(ImageQueries.get(src))
      .catch(errorHandler)
  }
}