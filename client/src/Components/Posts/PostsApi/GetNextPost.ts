import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { ModelResponse } from '../../../Lib/ServerApi/Response'
import { ServerClient } from '../../../Lib/ServerApi/ServerClient'
import { Post } from '../Post'
import { postsQueryKeys } from './PostsQueryKeys'

type Params = { postId: Post['id']; enabled?: boolean }

type ResponseBody = ModelResponse<'post', Post>

export const getNextPost = ({ postId }: Params): Promise<Post> => {
  return ServerClient.get<ResponseBody>(`/posts/${postId}/next`)
    .then(res => res.post)
}

export const useNextPost = (params: Params): UseQueryResult<Post> => {
  const queryClient = useQueryClient()

  return useQuery({
    enabled: params.enabled,
    queryKey: postsQueryKeys.getNextPost(params.postId),
    queryFn: () => getNextPost(params),
    retry: false,
    onSuccess: (post) => {
      queryClient.setQueryData(postsQueryKeys.getPost(post.id), post)
    },
  })
}
