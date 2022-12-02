import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { Post } from '../../Models'
import { ServerClient } from '../../ServerClient'
import { QueryKeys } from '../QueryKeys'
import { PagedModelResponse } from '../Response'

type Params = { numImages?: number }

type ResponseBody = PagedModelResponse<'posts', Post>

export const getRecentPosts = ({ numImages }: Params): Promise<Post[]> => {
  return ServerClient.get<ResponseBody>('/posts/recent', { params: { numImages } })
    .then(res => res.posts)
}

export const useRecentPosts = (params: Params): UseQueryResult<Post[]> => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: QueryKeys.posts.getRecent(),
    queryFn: () => getRecentPosts(params),
    onSuccess: (recentPosts) => {
      recentPosts.forEach(post => {
        queryClient.setQueryData(QueryKeys.posts.getPost(post.id), post)
      })
    },
  })
}
