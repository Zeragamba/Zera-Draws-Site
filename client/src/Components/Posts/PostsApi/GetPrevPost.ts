import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { ModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { Post } from '../Post'
import { setGetPostData, usePost } from './GetPost'
import { postsQueryKeys } from './PostsQueryKeys'

type Params = {
  postId: Post['id']
}

type ResponseBody = ModelResponse<'post', Post>

export const getPrevPost = ({ postId }: Params): Promise<Post> => {
  return ServerClient.get<ResponseBody>(`/posts/${postId}/prev`)
    .then(res => res.post)
}

export const usePrevPost = (params: Params): UseQueryResult<Post> => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: postsQueryKeys.getPrevPost(params.postId),
    queryFn: () => getPrevPost(params),
    retry: false,
    onSuccess: (post) => setGetPostData(queryClient, post),
  })
}
