import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { ModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { EditablePost, EditablePostFields, Post } from '../Post'
import { postsQueryKeys } from './PostsQueryKeys'

export type ImageChangePayload =
  | { action: 'add'; id: string; filename: string; order?: number; file: File }
  | { action: 'edit'; id: string; filename?: string; order?: number; file?: File }
  | { action: 'remove'; id: string }

export type EditPostRes = ModelResponse<'post', Post>
export type EditPostReq = {
  post?: Partial<EditablePost>
  images?: ImageChangePayload[]
}

type Params = { postId: Post['id'] } & EditPostReq

export const editPost = ({ postId, post, images }: Params): Promise<Post> => {
  const formData = new FormData()

  if (post) {
    const editableFields: string[] = Object.values(EditablePostFields)

    Object.entries(post)
      .filter(([ prop ]) => editableFields.includes(prop))
      .forEach(([ prop, value ]) => {
        formData.set(`post[${prop}]`, String(value))
      })
  }

  if (images) {
    images.forEach((change, index) => {
      Object.entries(change).forEach(([ prop, value ]) => {
        switch (prop) {
          case 'file':
            formData.set(`images[${index}][file]`, value as File)
            break
          default:
            formData.set(`images[${index}][${prop}]`, String(value))
        }
      })
    })
  }

  return ServerClient.patch<EditPostRes, FormData>(`/posts/${postId}`, formData)
    .then(res => res.post)
}

export const useEditPost = (): UseMutationResult<Post, unknown, Params> => {
  const queryClient = useQueryClient()

  return useMutation<Post, unknown, Params>(editPost, {
    onMutate: async ({ postId, post }) => {
      queryClient.setQueryData(
        postsQueryKeys.getPost(postId),
        (savedPost) => {
          return ({ savedPost, ...post })
        },
      )
    },
    onSuccess: async (updatedPost) => {
      queryClient.setQueryData(
        postsQueryKeys.getPost(updatedPost.id),
        updatedPost,
      )
    },
  })
}
