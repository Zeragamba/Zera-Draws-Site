import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { postsQueryKeys } from './PostsQueryKeys'
import { ModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { EditableImage } from '../../Images/ImageData'
import { tagQueryKeys } from '../../Tags/TagQueryKeys'
import { EditablePost, PostData, postToFormData } from '../PostData'

export type CreatePostRes = ModelResponse<'post', PostData>
export type CreatePostReq = {
  post: EditablePost
  images: Required<EditableImage>[]
}

export const createPost = ({ post, images }: CreatePostReq): Promise<PostData> => {
  const formData = postToFormData(post)

  images.forEach((image, index) => {
    Object.entries(image).forEach(([ prop, value ]) => {
      switch (prop) {
        case 'file':
          formData.set(`images[${index}][file]`, value as File)
          break
        default:
          formData.set(`images[${index}][${prop}]`, String(value))
      }
    })
  })

  return ServerClient.post<CreatePostRes, FormData>('/posts', formData)
    .then(res => res.post)
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
