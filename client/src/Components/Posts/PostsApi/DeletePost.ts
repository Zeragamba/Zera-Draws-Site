import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { postsQueryKeys } from './PostsQueryKeys'
import { ModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { tagQueryKeys } from '../../Tags/TagQueryKeys'
import { EditablePost, PostData } from '../PostData'

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

export const deletePost = ({ postId }: Params): Promise<PostData> => {
  return ServerClient.delete<EditPostRes, FormData>(`/post/${postId}`)
    .then(res => res.post)
}

export const useDeletePost = (): UseMutationResult<PostData, unknown, Params> => {
  const queryClient = useQueryClient()

  return useMutation<PostData, unknown, Params>(deletePost, {
    onSuccess: async (deletedPost) => {
      queryClient.invalidateQueries(tagQueryKeys._def)
      queryClient.invalidateQueries(postsQueryKeys.get(deletedPost.id).queryKey)
      queryClient.invalidateQueries(postsQueryKeys.get(deletedPost.slug).queryKey)
      queryClient.invalidateQueries(postsQueryKeys.all)
    },
  })
}
