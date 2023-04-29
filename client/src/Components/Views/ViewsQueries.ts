import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { ViewsData } from './ViewsData'
import { PostData } from '../Posts/PostData'
import { postsQueryKeys } from '../Posts/PostsApi/PostsQueryKeys'


export function usePostViews$(postId: PostData['id']): UseQueryResult<ViewsData> {
  return useQuery({
    ...postsQueryKeys.get(postId)._ctx.views,
  })
}
