import { useQuery, useQueryClient, UseQueryResult } from 'react-query'

import { Post } from '../../Models'
import { ServerClient } from '../../ServerClient'
import { QueryKeys } from '../QueryKeys'
import { ModelResponse } from '../Response'

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
    queryKey: QueryKeys.posts.getNextPost(params.postId),
    queryFn: () => getNextPost(params),
    retry: false,
    onSuccess: (post) => {
      queryClient.setQueryData(QueryKeys.posts.getPost(post.id), post)
    },
  })
}
