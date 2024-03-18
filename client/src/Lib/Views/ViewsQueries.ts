import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { ViewsData } from './ViewsData'
import { postViewsApi } from '../../Api'
import { queryKeys } from '../../Queries/QueryKeys'
import { PostData } from '../Posts/PostData'


export function usePostViews$(postId: PostData['id']): UseQueryResult<ViewsData> {
  return useQuery({
    ...queryKeys.posts.forPost({ postId })._ctx.views,
    queryFn: () => postViewsApi.fetchViews({ postId }),
  })
}
