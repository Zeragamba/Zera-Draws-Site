import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query'

import { Picture } from '../../Models'
import { ServerClient } from '../../ServerClient'
import { QueryKeys } from '../QueryKeys'
import { PagedModelResponse } from '../Response'

type Params = { gallery: string; page?: number }

type ResponseBody = PagedModelResponse<'pictures', Picture>

export const getGalleryPictures = (params: Params): Promise<ResponseBody> => {
  const { page = 0, gallery } = params
  return ServerClient.get<ResponseBody>(`/gallery/${gallery}/pictures`, { params: { page } })
}

export const useGalleryPictures = ({ gallery }: Omit<Params, 'page'>): UseInfiniteQueryResult<Picture[]> => {
  return useInfiniteQuery<ResponseBody, unknown, Picture[]>({
    queryKey: QueryKeys.pictures.getGalleryPictures(gallery),
    queryFn: ({ pageParam = 0 }) => {
      return getGalleryPictures({ page: pageParam, gallery })
    },
    select: (data) => ({
      pages: data.pages.map(page => page.pictures),
      pageParams: data.pageParams,
    }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages - 1) {
        return lastPage.page + 1
      }
    },
    getPreviousPageParam: (lastPage) => {
      if (lastPage.page > 0) {
        return lastPage.page - 1
      }
    },
  })
}
