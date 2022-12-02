import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { Post } from '../../Models'
import { ServerClient } from '../../ServerClient'
import { QueryKeys } from '../QueryKeys'
import { ModelResponse } from '../Response'
import { GetAllPostsRes } from './GetAllPosts'

type Params = { postId: Post['id']; enabled?: boolean }

type ResponseBody = ModelResponse<'post', Post>

export const getPost = ({ postId }: Params): Promise<Post> => {
  return ServerClient.get<ResponseBody>(`/posts/${postId}`)
    .then(res => res.post)
}

export const usePost = (params: Params): UseQueryResult<Post> => {
  const queryClient = useQueryClient()

  return useQuery({
    enabled: params.enabled,
    queryKey: QueryKeys.posts.getPost(params.postId),
    queryFn: () => getPost(params),
    initialData: () => {
      const cachedData = queryClient.getQueryData<{ pages: GetAllPostsRes[] }>(QueryKeys.posts.getAllPosts())
      if (!cachedData) return

      return cachedData.pages
        .map(page => page.posts)
        .flat()
        .find(Post => Post.id === params.postId)
    },
  })
}
