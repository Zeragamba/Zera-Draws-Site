import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { postsQueryKeys } from './PostsQueryKeys'
import { ModelResponse, ServerClient } from '../../ServerApi'
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

  return useMutation<PostData, unknown, DeletePostParams>({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      await queryClient.invalidateQueries({ queryKey: tagQueryKeys._def })
      await queryClient.invalidateQueries({ queryKey: postsQueryKeys.get(deletedPost.id).queryKey })
      await queryClient.invalidateQueries({ queryKey: postsQueryKeys.get(deletedPost.slug).queryKey })
      await queryClient.invalidateQueries({ queryKey: postsQueryKeys.all.queryKey })
    },
  })
}
