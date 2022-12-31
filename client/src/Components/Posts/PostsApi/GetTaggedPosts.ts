import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'

import { PagedModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { Post } from '../Post'
import { postsQueryKeys } from './PostsQueryKeys'


type Params = { tag: string; page?: number }

type ResponseBody = PagedModelResponse<'posts', Post>

export const getGalleryPosts = (params: Params): Promise<ResponseBody> => {
  const { page = 0, tag } = params
  return ServerClient.get<ResponseBody>(`/tag/${tag}/posts`, { params: { page } })
}

export const useTaggedPosts = ({ tag }: Omit<Params, 'page'>): UseInfiniteQueryResult<Post[]> => {
  return useInfiniteQuery<ResponseBody, unknown, Post[]>({
    queryKey: postsQueryKeys.getTaggedPosts(tag),
    queryFn: ({ pageParam = 0 }) => {
      return getGalleryPosts({ page: pageParam, tag })
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
