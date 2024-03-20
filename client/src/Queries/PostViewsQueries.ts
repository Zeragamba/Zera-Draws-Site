import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query'

import { queryKeys } from './QueryKeys'
import { postViewsApi } from '../Api'
import { PostData } from '../Models/PostData'
import { ViewsData } from '../Models/ViewsData'

export const usePostViews$ = (params: {
  postId: PostData['id']
}): UseQueryResult<ViewsData> => {
  return useQuery({
    ...queryKeys.posts.forPost(params)._ctx.views,
    queryFn: () => postViewsApi.fetchViews(params),
  })
}

export const useAddView$ = (): UseMutationResult<ViewsData, unknown, {
  postId: PostData['id']
  viewerId: string
}> => {
  return useMutation({
    mutationFn: (params) => postViewsApi.addView(params),
  })
}
