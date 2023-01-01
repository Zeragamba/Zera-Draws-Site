import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { PagedModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { Post } from '../Post'
import { postsQueryKeys } from './PostsQueryKeys'

type Params = { numImages?: number }

type ResponseBody = PagedModelResponse<'posts', Post>

export const getRecentPosts = ({ numImages }: Params): Promise<Post[]> => {
  return ServerClient.get<ResponseBody>('/posts/recent', { params: { numImages } })
    .then(res => res.posts)
}

export const useRecentPosts = (params: Params): UseQueryResult<Post[]> => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: postsQueryKeys.getRecent(),
    queryFn: () => getRecentPosts(params),
    onSuccess: (recentPosts) => {
      recentPosts.forEach(post => {
        queryClient.setQueryData(postsQueryKeys.getPost(post.id), post)
      })
    },
  })
}
