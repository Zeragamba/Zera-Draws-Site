import { useMutation, UseMutationResult, useQueryClient } from 'react-query'

import { EditableImage, EditablePost, Post } from '../../Models'
import { ServerClient } from '../../ServerClient'
import { QueryKeys } from '../QueryKeys'
import { ModelResponse } from '../Response'

type Params = { post: EditablePost; images: EditableImage[] }

export type CreatePostRes = ModelResponse<'post', Post>

export const createPost = ({ post, images }: Params): Promise<Post> => {
  const formData = new FormData()

  Object.entries(post).forEach(([ prop, value ]) => {
    formData.set(`Post[${prop}]`, String(value))
  })

  images.forEach((image, index) => {
    formData.set(`image[${index}][filename]`, image.filename)
    formData.set(`image[${index}][file]`, image.file)
  })

  return ServerClient.post<CreatePostRes, FormData>('/posts', formData)
    .then(res => res.post)
}

export const useCreatePost = (): UseMutationResult<Post, unknown, Params> => {
  const queryClient = useQueryClient()

  return useMutation<Post, unknown, Params>(createPost, {
    onSuccess: async (createdPost) => {
      await queryClient.invalidateQueries(QueryKeys.posts.prefix())
      queryClient.setQueryData(QueryKeys.posts.getPost(createdPost.id), createdPost)
    },
  })
}
