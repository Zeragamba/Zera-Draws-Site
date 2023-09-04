import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { postsQueryKeys } from './PostsQueryKeys'
import { noop } from '../../../Lib/Noop'
import { ModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { EditableImage } from '../../Images/ImageData'
import { tagQueryKeys } from '../../Tags/TagQueryKeys'
import { EditablePost, PostData, postToFormData } from '../PostData'

export type CreatePostRes = ModelResponse<'post', PostData>
export type CreatePostReq = {
  post: EditablePost
  images: EditableImage[]
  onUploadProgress?: (progress: number) => void
}

export const createPost = (params: CreatePostReq): Promise<PostData> => {
  const {
    post,
    images,
    onUploadProgress = noop,
  } = params

  return ServerClient.post<CreatePostRes, FormData>(
    '/posts',
    postToFormData({ post, images }),
    {
      onUploadProgress: (event) => {
        const progress = event.progress || 0
        onUploadProgress(progress * 100)
      },
    },
  ).then(res => res.post)
}

export const useCreatePost$ = (): UseMutationResult<PostData, unknown, CreatePostReq> => {
  const queryClient = useQueryClient()

  return useMutation<PostData, unknown, CreatePostReq>(createPost, {
    onSuccess: (createdPost) => {
      queryClient.invalidateQueries(postsQueryKeys._def)
      queryClient.invalidateQueries(tagQueryKeys._def)
      queryClient.setQueryData(postsQueryKeys.get(createdPost.id).queryKey, createdPost)
      queryClient.setQueryData(postsQueryKeys.get(createdPost.slug).queryKey, createdPost)
    },
  })
}
