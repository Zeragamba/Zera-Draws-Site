import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { ModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { Post } from '../Post'
import { setGetPostData } from './GetPost'
import { postsQueryKeys } from './PostsQueryKeys'

type GetNextPostParams = {
  postId: Post['id']
}

type GetNextPostRes = ModelResponse<'post', Post>

export const getNextPost = ({ postId }: GetNextPostParams): Promise<Post> => {
  return ServerClient.get<GetNextPostRes>(`/posts/${postId}/next`)
    .then(res => res.post)
}

export const useNextPost = (params: GetNextPostParams): UseQueryResult<Post> => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: postsQueryKeys.getNextPost(params.postId),
    queryFn: () => getNextPost(params),
    retry: false,
    onSuccess: (post) => setGetPostData(queryClient, post),
  })
}
