import { QueryKey } from '@tanstack/query-core/build/modern/index'
import { useInfiniteQuery, UseInfiniteQueryResult, useQueryClient } from '@tanstack/react-query'

import { cachePostData } from './GetPost'
import { postsQueryKeys } from './PostsQueryKeys'
import { PagedModelResponse, ServerClient } from '../../ServerApi'
import { PostData } from '../PostData'

type Params = { page?: number }

export type GetAllPostsRes = PagedModelResponse<'posts', PostData>

export const getAllPosts = (params: Params = {}): Promise<GetAllPostsRes> => {
  const { page = 0 } = params
  return ServerClient.get<GetAllPostsRes>('/posts', { params: { page } })
}

export const useAllPosts$ = (): UseInfiniteQueryResult<PostData[]> => {
  const queryClient = useQueryClient()

  return useInfiniteQuery<GetAllPostsRes, Error, PostData[], QueryKey, number>({
    ...postsQueryKeys.all,
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const res = await getAllPosts({ page: pageParam })
      res.posts.forEach((post) => cachePostData(queryClient, post))
      return res
    },
    select: (data) => data.pages.map(page => page.posts).flat(),
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
