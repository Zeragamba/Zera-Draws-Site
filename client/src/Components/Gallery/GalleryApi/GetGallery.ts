import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { ModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { GalleryData } from '../GalleryData'

type GetGalleryPrams = { galleryId: string }
type GetGalleryRes = ModelResponse<'gallery', GalleryData>

export const getGallery = ({ galleryId }: GetGalleryPrams): Promise<GalleryData> => {
  return ServerClient.get<GetGalleryRes>(`/gallery/${galleryId}`)
    .then(res => res.gallery)
}

export const useGallery = (params: GetGalleryPrams): UseQueryResult<GalleryData> => {
  return useQuery({
    queryFn: () => getGallery(params),
  })
}
