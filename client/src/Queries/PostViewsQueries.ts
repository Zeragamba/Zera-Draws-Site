import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query'

import { postViewsApiClient } from '../Api/Endpoints/PostViewsApiClient'
import { PostData, ViewsData } from '../Lib'

export const usePostViews$ = (params: {
  postId: PostData['id']
}): UseQueryResult<ViewsData> => {
  return useQuery({
    queryKey: [ 'posts', params, 'views' ],
    queryFn: () => postViewsApiClient.fetchViews(params),
  })
}

export const useAddView$ = (): UseMutationResult<ViewsData, unknown, {
  postId: PostData['id']
  viewerId: string
}> => {
  return useMutation({
    mutationFn: (params) => postViewsApiClient.addView(params),
  })
}
