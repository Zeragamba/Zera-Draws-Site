import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { galleryApiClient } from '../Api'
import { GalleryData } from '../Lib'

export const useGallery$ = (params: {
  galleryId: GalleryData['id']
}): UseQueryResult<GalleryData> => {
  return useQuery({
    queryKey: [ 'gallery', params ],
    queryFn: () => galleryApiClient.fetchGallery(params),
  })
}
