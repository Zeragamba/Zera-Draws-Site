import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { queryKeys } from './QueryKeys'
import { errorHandler, ImageData } from '../Lib'

function fetchImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new Image()
    image.src = src
    image.onload = () => resolve(image)
  })
}

export const useImage$ = (src: string): UseQueryResult<HTMLImageElement> => {
  return useQuery({
    ...queryKeys.images.get({ src }),
    queryFn: () => fetchImage(src),
  })
}

export type ImagePreloader = (options: {
  image: ImageData
  size?: string
}) => void

export const useImagePreloader = (): ImagePreloader => {
  const queryClient = useQueryClient()

  return ({ image, size = 'high' }) => {
    const src = image.srcs[size] || image.srcs.full
    queryClient.prefetchQuery({
      ...queryKeys.images.get({ src }),
      queryFn: () => fetchImage(src),
    }).catch(errorHandler)
  }
}
