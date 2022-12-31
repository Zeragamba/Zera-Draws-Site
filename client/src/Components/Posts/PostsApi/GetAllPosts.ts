import { useInfiniteQuery, UseInfiniteQueryResult, useQueryClient } from '@tanstack/react-query'

import { PagedModelResponse } from '../../../Lib/ServerApi/Response'
import { ServerClient } from '../../../Lib/ServerApi/ServerClient'
import { Post } from '../Post'
import { postsQueryKeys } from './PostsQueryKeys'

type Params = { page?: number }

export type GetAllPostsRes = PagedModelResponse<'posts', Post>

export const getAllPosts = (params: Params = {}): Promise<GetAllPostsRes> => {
  const { page = 0 } = params
  return ServerClient.get<GetAllPostsRes>('/posts', { params: { page } })
}

export const useAllPosts = (): UseInfiniteQueryResult<Post[]> => {
  const queryClient = useQueryClient()

  return useInfiniteQuery<GetAllPostsRes, unknown, Post[]>({
    queryKey: postsQueryKeys.getAllPosts(),
    queryFn: ({ pageParam = 0 }) => {
      return getAllPosts({ page: pageParam })
    },
    onSuccess: (data) => {
      const posts: Post[] = data.pages.map(page => page).flat()
      posts.forEach((post) => {
        queryClient.setQueryData(postsQueryKeys.getPost(post.id), post)
      })
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
