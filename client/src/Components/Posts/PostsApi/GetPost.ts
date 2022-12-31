import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { ModelResponse } from '../../../Lib/ServerApi/Response'
import { ServerClient } from '../../../Lib/ServerApi/ServerClient'
import { Post } from '../Post'
import { postsQueryKeys } from './PostsQueryKeys'

type Params = { postId: Post['id']; enabled?: boolean }

type ResponseBody = ModelResponse<'post', Post>

export const getPost = ({ postId }: Params): Promise<Post> => {
  return ServerClient.get<ResponseBody>(`/posts/${postId}`)
    .then(res => res.post)
}

export const usePost = (params: Params): UseQueryResult<Post> => {
  return useQuery({
    enabled: params.enabled,
    queryKey: postsQueryKeys.getPost(params.postId),
    queryFn: () => getPost(params),
  })
}
