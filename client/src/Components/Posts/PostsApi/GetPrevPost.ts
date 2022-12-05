import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { ModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { Post } from '../Post'
import { postsQueryKeys } from './PostsQueryKeys'

type Params = { postId: Post['id']; enabled?: boolean }

type ResponseBody = ModelResponse<'post', Post>

export const getPrevPost = ({ postId }: Params): Promise<Post> => {
  return ServerClient.get<ResponseBody>(`/posts/${postId}/prev`)
    .then(res => res.post)
}

export const usePrevPost = (params: Params): UseQueryResult<Post> => {
  const queryClient = useQueryClient()

  return useQuery({
    enabled: params.enabled,
    queryKey: postsQueryKeys.getPrevPost(params.postId),
    queryFn: () => getPrevPost(params),
    retry: false,
    onSuccess: (post) => {
      queryClient.setQueryData(postsQueryKeys.getPost(post.id), post)
    },
  })
}
