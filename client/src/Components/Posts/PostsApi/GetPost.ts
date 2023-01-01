import { QueryClient, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { ModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { Post } from '../Post'
import { postsQueryKeys } from './PostsQueryKeys'

type Params = {
  postId: Post['id']
}

type ResponseBody = ModelResponse<'post', Post>

export const getPost = ({ postId }: Params): Promise<Post> => {
  return ServerClient.get<ResponseBody>(`/posts/${postId}`)
    .then(res => res.post)
}

export const usePost = (params: Params): UseQueryResult<Post> => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: postsQueryKeys.getPost(params.postId),
    queryFn: () => getPost(params),
    onSuccess: (post) => setGetPostData(queryClient, post),
  })
}

export const setGetPostData = (queryClient: QueryClient, post: Post) => {
  console.log(`caching post ${post.id} ${post.slug}`)
  queryClient.setQueryData(postsQueryKeys.getPost(post.id), post)
  queryClient.setQueryData(postsQueryKeys.getPost(post.slug), post)
}
