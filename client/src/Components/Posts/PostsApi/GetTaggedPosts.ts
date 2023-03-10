import { useInfiniteQuery, UseInfiniteQueryResult, useQueryClient } from '@tanstack/react-query'

import { cachePostData } from './GetPost'
import { PagedModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { tagQueryKeys } from '../../Tags/TagQueryKeys'
import { PostData } from '../PostData'

type Params = {
  tag: string
  page?: number
  limit?: number
}

type ResponseBody = PagedModelResponse<'posts', PostData>

export const getTaggedPosts = (params: Params): Promise<ResponseBody> => {
  const { page = 0, tag } = params
  return ServerClient.get<ResponseBody>(`/tag/${tag}/posts`, { params: { page } })
}

export const useTaggedPosts$ = ({ tag, limit = 100 }: Omit<Params, 'page'>): UseInfiniteQueryResult<PostData[]> => {
  const queryClient = useQueryClient()

  return useInfiniteQuery<ResponseBody, unknown, PostData[]>({
    ...tagQueryKeys.get(tag)._ctx.posts,
    queryFn: (ctx) => getTaggedPosts({ page: ctx.pageParam, tag, limit }),
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
