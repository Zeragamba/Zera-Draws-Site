import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { cachePostData } from './GetPost'
import { postsQueryKeys } from './PostsQueryKeys'
import { PagedModelResponse, ServerClient } from '../../ServerApi'
import { PostData } from '../PostData'

type Params = { numImages?: number }

type ResponseBody = PagedModelResponse<'posts', PostData>

export const getRecentPosts = ({ numImages }: Params): Promise<PostData[]> => {
  return ServerClient.get<ResponseBody>('/posts/recent', { params: { numImages } })
    .then(res => res.posts)
}

export const useRecentPosts = (params: Params): UseQueryResult<PostData[]> => {
  const queryClient = useQueryClient()

  return useQuery({
    ...postsQueryKeys.recent,
    queryFn: async () => {
      const posts = await getRecentPosts(params)
      posts.forEach(post => cachePostData(queryClient, post))
      return posts
    },
  })
}
