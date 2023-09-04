import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { postsQueryKeys } from './PostsQueryKeys'
import { ModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { tagQueryKeys } from '../../Tags/TagQueryKeys'
import { PostData } from '../PostData'

export type DeletePostRes = ModelResponse<'post', PostData>

type DeletePostParams = { postId: PostData['id'] }

export const deletePost = ({ postId }: DeletePostParams): Promise<PostData> => {
  return ServerClient.delete<DeletePostRes, FormData>(`/post/${postId}`)
    .then(res => res.post)
}

export const useDeletePost = (): UseMutationResult<PostData, unknown, DeletePostParams> => {
  const queryClient = useQueryClient()

  return useMutation<PostData, unknown, DeletePostParams>(deletePost, {
    onSuccess: async (deletedPost) => {
      queryClient.invalidateQueries(tagQueryKeys._def)
      queryClient.invalidateQueries(postsQueryKeys.get(deletedPost.id).queryKey)
      queryClient.invalidateQueries(postsQueryKeys.get(deletedPost.slug).queryKey)
      queryClient.invalidateQueries(postsQueryKeys.all)
    },
  })
}
