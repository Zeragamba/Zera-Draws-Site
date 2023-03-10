import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { cachePostData } from './GetPost'
import { postsQueryKeys } from './PostsQueryKeys'
import { ModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { PostData } from '../PostData'

type ResponseBody = ModelResponse<'post', PostData>

export const getLatestPost = (): Promise<PostData> => {
  return ServerClient.get<ResponseBody>('/post/latest')
    .then(res => res.post)
}

export const useLatestPost$ = (): UseQueryResult<PostData> => {
  const queryClient = useQueryClient()

  return useQuery({
    ...postsQueryKeys.latest,
    queryFn: () => getLatestPost(),
    onSuccess: (latest) => cachePostData(queryClient, latest),
  })
}
