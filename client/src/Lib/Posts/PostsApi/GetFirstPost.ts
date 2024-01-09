import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { cachePostData } from './GetPost'
import { postsQueryKeys } from './PostsQueryKeys'
import { ModelResponse, ServerClient } from '../../ServerApi'
import { PostData } from '../PostData'

type ResponseBody = ModelResponse<'post', PostData>

export const getFirstPost = (): Promise<PostData> => {
  return ServerClient.get<ResponseBody>('/post/first')
    .then(res => res.post)
}

export const useFirstPost$ = (): UseQueryResult<PostData> => {
  const queryClient = useQueryClient()

  return useQuery({
    ...postsQueryKeys.first,
    queryFn: async () => {
      const post = await getFirstPost()
      cachePostData(queryClient, post)
      return post
    },
  })
}
