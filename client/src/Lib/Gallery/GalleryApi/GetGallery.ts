import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { ModelResponse, ServerClient } from '../../ServerApi'
import { GalleryData } from '../GalleryData'
import { galleryQueryKeys } from '../GalleryQueryKeys'

type GetGalleryPrams = { galleryId?: string }
type GetGalleryRes = ModelResponse<'gallery', GalleryData>

export const getGallery = ({ galleryId }: GetGalleryPrams): Promise<GalleryData> => {
  return ServerClient.get<GetGalleryRes>(`/gallery/${galleryId}`)
    .then(res => res.gallery)
}

export const useGallery$ = (params: GetGalleryPrams): UseQueryResult<GalleryData> => {
  const queryClient = useQueryClient()

  return useQuery({
    ...galleryQueryKeys.get(params.galleryId),
    queryFn: async () => {
      const gallery = await getGallery(params)
      queryClient.setQueryData(galleryQueryKeys.get(gallery.id).queryKey, gallery)
      queryClient.setQueryData(galleryQueryKeys.get(gallery.slug).queryKey, gallery)
      return gallery
    },
  })
}
