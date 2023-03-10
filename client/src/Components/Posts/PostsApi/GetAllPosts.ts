import { useInfiniteQuery, UseInfiniteQueryResult, useQueryClient } from '@tanstack/react-query'

import { cachePostData } from './GetPost'
import { postsQueryKeys } from './PostsQueryKeys'
import { PagedModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { PostData } from '../PostData'

type Params = { page?: number }

export type GetAllPostsRes = PagedModelResponse<'posts', PostData>

export const getAllPosts = (params: Params = {}): Promise<GetAllPostsRes> => {
  const { page = 0 } = params
  return ServerClient.get<GetAllPostsRes>('/posts', { params: { page } })
}

export const useAllPosts$ = (): UseInfiniteQueryResult<PostData[]> => {
  const queryClient = useQueryClient()

  return useInfiniteQuery<GetAllPostsRes, unknown, PostData[]>({
    ...postsQueryKeys.all,
    queryFn: ({ pageParam = 0 }) => {
      return getAllPosts({ page: pageParam })
    },
    onSuccess: (data) => {
      const posts: PostData[] = data.pages.map(page => page).flat()
      posts.forEach((post) => cachePostData(queryClient, post))
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
