import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { EditableImage, EditablePost, Post } from '../../Models'
import { ServerClient } from '../../ServerClient'
import { QueryKeys } from '../QueryKeys'
import { ModelResponse } from '../Response'

export type CreatePostRes = ModelResponse<'post', Post>
export type CreatePostReq = {
  post: EditablePost
  images: Required<EditableImage>[]
}

export const createPost = ({ post, images }: CreatePostReq): Promise<Post> => {
  const formData = new FormData()

  Object.entries(post).forEach(([ prop, value ]) => {
    formData.set(`post[${prop}]`, String(value))
  })

  images.forEach((image, index) => {
    Object.entries(image).forEach(([ prop, value ]) => {
      switch (prop) {
        case 'file':
          formData.set(`image[${index}][file]`, value as File)
          break
        default:
          formData.set(`image[${index}][${prop}]`, String(value))
      }
    })
  })

  return ServerClient.post<CreatePostRes, FormData>('/posts', formData)
    .then(res => res.post)
}

export const useCreatePost = (): UseMutationResult<Post, unknown, CreatePostReq> => {
  const queryClient = useQueryClient()

  return useMutation<Post, unknown, CreatePostReq>(createPost, {
    onSuccess: async (createdPost) => {
      await queryClient.invalidateQueries(QueryKeys.posts.prefix())
      queryClient.setQueryData(QueryKeys.posts.getPost(createdPost.id), createdPost)
    },
  })
}
