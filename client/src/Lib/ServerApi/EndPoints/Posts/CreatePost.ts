import { useMutation, UseMutationResult, useQueryClient } from 'react-query'

import { EditablePost, Post } from '../../Models'
import { ServerClient } from '../../ServerClient'
import { QueryKeys } from '../QueryKeys'
import { ModelResponse } from '../Response'

type Params = { post: EditablePost; image: File }

export type CreatePostRes = ModelResponse<'post', Post>

export const createPost = ({ post, image }: Params): Promise<Post> => {
  const formData = new FormData()


  Object.entries(post).forEach(([ prop, value ]) => {
    formData.set(`Post[${prop}]`, value)
  })

  formData.set('image', image)

  return ServerClient.post<CreatePostRes, FormData>('/posts', formData)
    .then(res => res.post)
}

export const useCreatePost = (): UseMutationResult<Post, unknown, Params> => {
  const queryClient = useQueryClient()

  return useMutation<Post, unknown, Params>(createPost, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QueryKeys.posts.prefix())
    },
  })
}
