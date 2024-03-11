import type { QueryKey } from '@tanstack/query-core/build/modern/index'
import { useInfiniteQuery, UseInfiniteQueryResult, useQueryClient } from '@tanstack/react-query'

import { cachePostData } from './GetPost'
import { PagedModelResponse, ServerClient } from '../../ServerApi'
import { tagQueryKeys } from '../../Tags/TagQueryKeys'
import { PostData } from '../PostData'

type Params = {
  tagId: string
  page?: number
  limit?: number
}

type ResponseBody = PagedModelResponse<'posts', PostData>

export const getTaggedPosts = (params: Params): Promise<ResponseBody> => {
  const { page = 0, tagId } = params
  return ServerClient.get<ResponseBody>(`/tag/${tagId}/posts`, { params: { page } })
}

export const useTaggedPosts$ = ({ tagId, limit = 100 }: Omit<Params, 'page'>): UseInfiniteQueryResult<PostData[]> => {
  const queryClient = useQueryClient()

  return useInfiniteQuery<ResponseBody, Error, PostData[], QueryKey, number>({
    ...tagQueryKeys.get(tagId)._ctx.posts,
    initialPageParam: 0,
    queryFn: async (ctx) => {
      const res = await getTaggedPosts({ page: ctx.pageParam, tagId, limit })
      res.posts.forEach((post) => cachePostData(queryClient, post))
      return res
    },
    select: (data) => (data.pages.map(page => page.posts).flat()),
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
