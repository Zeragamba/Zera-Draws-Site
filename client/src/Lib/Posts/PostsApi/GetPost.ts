import { QueryClient, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { postsQueryKeys } from './PostsQueryKeys'
import { ModelResponse, ServerClient } from '../../ServerApi'
import { PostData } from '../PostData'

type Params = {
  postId: PostData['id']
  tag?: string
  gallery?: string
}

type ResponseBody = ModelResponse<'post', PostData>


export const getPost = ({ postId, tag, gallery }: Params): Promise<PostData> => {
  return ServerClient.get<ResponseBody>(getPostUrl({ postId, tagId: tag, galleryId: gallery }))
    .then(res => res.post)
}

export const usePost$ = (params: Params): UseQueryResult<PostData> => {
  const queryClient = useQueryClient()

  return useQuery({
    ...postsQueryKeys.get(params.postId),
    queryFn: async () => {
      const post = await getPost(params)
      cachePostData(queryClient, post)
      return post
    },
  })
}

export const cachePostData = (queryClient: QueryClient, post: PostData) => {
  queryClient.setQueryData(postsQueryKeys.get(post.id).queryKey, post)
  queryClient.setQueryData(postsQueryKeys.get(post.slug).queryKey, post)
}

type PostUrlParams = {
  postId: string
  tagId?: string
  galleryId?: string
}

export const getPostUrl = ({ postId, tagId, galleryId }: PostUrlParams) => {
  if (tagId) {
    return `/tag/${tagId}/${postId}`
  } else if (galleryId) {
    return `/gallery/${galleryId}/${postId}`
  } else {
    return `/post/${postId}`
  }
}
