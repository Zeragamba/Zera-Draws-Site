import { useQueryClient } from '@tanstack/react-query'

import { errorHandler, ImageData, ImageQueries, useImagePreload } from '../../../../Lib'

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
