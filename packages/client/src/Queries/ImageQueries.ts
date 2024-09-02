import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"

import { queryKeys } from "./QueryKeys"
import { imageApi } from "../Api/Endpoints/ImageApi"
import { errorHandler } from "../Errors/ErrorHandler.ts"
import { ImageData } from "../Models"

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
