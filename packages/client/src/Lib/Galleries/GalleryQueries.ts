import { useQuery, UseQueryResult } from "@tanstack/react-query"

import { queryKeys } from "../../Queries/QueryKeys.ts"
import { GalleryData } from "../../Models"
import { galleryApiClient } from "./GalleryApi.ts"

export const useGallery$ = (params: {
  galleryId: GalleryData["id"]
}): UseQueryResult<GalleryData | null> => {
  const tag$ = useOptionalGallery$(params)
  if (tag$.data === null) throw new Error("Tag not found")
  return tag$ as UseQueryResult<GalleryData>
}

export const useOptionalGallery$ = (params: {
  galleryId?: GalleryData["id"]
}): UseQueryResult<GalleryData | null> => {
  const { galleryId = null } = params

  return useQuery({
    enabled: !!galleryId,
    ...queryKeys.galleries.forGallery({ galleryId })._ctx.data,
    queryFn: () => {
      if (!galleryId) return null
      return galleryApiClient.fetchGallery({ galleryId })
    },
  })
}
