import { createQueryKeys } from '@lukemorales/query-key-factory'
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { errorHandler } from '../../../Lib/ErrorHandler'

export const ImageQueries = createQueryKeys('images', {
  get: (src: string) => ({
    queryKey: [ src ],
    queryFn: () => new Promise((resolve) => {
      if (!src) return
      const image = new Image()
      image.src = src
      image.onload = () => resolve(image)
    }),
  }),
})

export const useImage$ = (src: string | undefined): UseQueryResult<HTMLImageElement> => {
  return useQuery({
    enabled: !!src,
    ...ImageQueries.get(src as string),
  })
}

export const useImagePreload = (src: string) => {
  useQueryClient().prefetchQuery(ImageQueries.get(src))
    .catch(errorHandler)
}
