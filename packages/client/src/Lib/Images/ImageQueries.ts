import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { errorHandler } from "../Errors/ErrorHandler"

import { queryKeys } from "../Queries/QueryKeys"
import { imageApi } from "./ImageApi"
import { ImageData } from "./ImageData"

export const useImage$ = (src: string): UseQueryResult<HTMLImageElement> => {
  return useQuery({
    ...queryKeys.images.get({ src }),
    queryFn: () => imageApi.fetchImage({ src }),
  })
}

export type ImagePreloader = (options: {
  image: ImageData
  size?: string
}) => void

export const useImagePreloader = (): ImagePreloader => {
  const queryClient = useQueryClient()

  return ({ image, size = "high" }) => {
    const src = image.srcs[size] || image.srcs.full
    queryClient
      .prefetchQuery({
        ...queryKeys.images.get({ src }),
        queryFn: () => imageApi.fetchImage({ src }),
      })
      .catch(errorHandler)
  }
}
