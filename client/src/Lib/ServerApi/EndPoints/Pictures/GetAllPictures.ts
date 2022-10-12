import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query'

import { Picture } from '../../Models'
import { ServerClient } from '../../ServerClient'
import { QueryKeys } from '../QueryKeys'
import { PagedModelResponse } from '../Response'

type Params = { page?: number }

export type GetAllPicturesRes = PagedModelResponse<'pictures', Picture>

export const getAllPictures = (params: Params = {}): Promise<GetAllPicturesRes> => {
  const { page = 0 } = params
  return ServerClient.get<GetAllPicturesRes>('/pictures', { params: { page } })
}

export const useAllPictures = (): UseInfiniteQueryResult<Picture[]> => {
  return useInfiniteQuery<GetAllPicturesRes, unknown, Picture[]>({
    queryKey: QueryKeys.pictures.getAllPictures(),
    queryFn: ({ pageParam = 0 }) => {
      return getAllPictures({ page: pageParam })
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
