import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { queryKeys } from './QueryKeys'
import { galleryApiClient } from '../Api'
import { GalleryData } from '../Lib'

export const useGallery$ = (params: {
  galleryId: GalleryData['id']
}): UseQueryResult<GalleryData> => {
  return useQuery({
    ...queryKeys.galleries.forGallery(params)._ctx.data,
    queryFn: () => galleryApiClient.fetchGallery(params),
  })
}
