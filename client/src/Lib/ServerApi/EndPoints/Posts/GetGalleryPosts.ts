import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'

import { Post } from '../../Models'
import { ServerClient } from '../../ServerClient'
import { QueryKeys } from '../QueryKeys'
import { PagedModelResponse } from '../Response'

type Params = { gallery: string; page?: number }

type ResponseBody = PagedModelResponse<'posts', Post>

export const getGalleryPosts = (params: Params): Promise<ResponseBody> => {
  const { page = 0, gallery } = params
  return ServerClient.get<ResponseBody>(`/gallery/${gallery}/posts`, { params: { page } })
}

export const useGalleryPosts = ({ gallery }: Omit<Params, 'page'>): UseInfiniteQueryResult<Post[]> => {
  return useInfiniteQuery<ResponseBody, unknown, Post[]>({
    queryKey: QueryKeys.posts.getGalleryPosts(gallery),
    queryFn: ({ pageParam = 0 }) => {
      return getGalleryPosts({ page: pageParam, gallery })
    },
    select: (data) => ({
      pages: data.pages.map(page => page.posts),
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
