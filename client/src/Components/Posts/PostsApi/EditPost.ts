import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { postsQueryKeys } from './PostsQueryKeys'
import { ModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { tagQueryKeys } from '../../Tags/TagQueryKeys'
import { EditablePost, PostData, postToFormData } from '../PostData'

export type ImageChangePayload =
  | { action: 'add'; id: string; filename: string; order?: number; file: File }
  | { action: 'edit'; id: string; filename?: string; order?: number; file?: File }
  | { action: 'remove'; id: string }

export type EditPostRes = ModelResponse<'post', PostData>
export type EditPostReq = {
  post?: Partial<EditablePost>
  images?: ImageChangePayload[]
}

type Params = { postId: PostData['id'] } & EditPostReq

export const editPost = ({ postId, post, images }: Params): Promise<PostData> => {
  const formData = post ? postToFormData(post) : new FormData()

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

  return ServerClient.patch<EditPostRes, FormData>(`/post/${postId}`, formData)
    .then(res => res.post)
}

export const useEditPost$ = (): UseMutationResult<PostData, unknown, Params> => {
  const queryClient = useQueryClient()

  return useMutation<PostData, unknown, Params>(editPost, {
    onSuccess: async (updatedPost) => {
      queryClient.invalidateQueries(postsQueryKeys._def)
      queryClient.invalidateQueries(tagQueryKeys._def)
      queryClient.setQueryData(postsQueryKeys.get(updatedPost.id).queryKey, updatedPost)
      queryClient.setQueryData(postsQueryKeys.get(updatedPost.slug).queryKey, updatedPost)
    },
  })
}
