import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { postsQueryKeys } from './PostsQueryKeys'
import { noop } from '../../../Lib/Noop'
import { ModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { ImageChangeRecord } from '../../Images/ImageApi/ImageChangeRecord'
import { tagQueryKeys } from '../../Tags/TagQueryKeys'
import { EditablePost, PostData, postToFormData } from '../PostData'

export type EditPostParams = {
  postId: PostData['id']
  post?: Partial<EditablePost>
  changes?: ImageChangeRecord[]
  onUploadProgress?: (progress: number) => void
}
export type EditPostRes = ModelResponse<'post', PostData>

export const editPost = (params: EditPostParams): Promise<PostData> => {
  const {
    postId,
    post,
    changes,
    onUploadProgress = noop,
  } = params

  return ServerClient.patch<EditPostRes, FormData>(
    `/post/${postId}`,
    postToFormData({ post, changes }),
    {
      onUploadProgress: (event) => {
        const progress = event.progress || 0
        onUploadProgress(progress * 100)
      },
    },
  ).then(res => res.post)
}

export const useEditPost$ = (): UseMutationResult<PostData, unknown, EditPostParams> => {
  const queryClient = useQueryClient()

  return useMutation<PostData, unknown, EditPostParams>({
    mutationFn: (params: EditPostParams) => editPost(params),
    onSuccess: async (updatedPost) => {
      await queryClient.invalidateQueries({ queryKey: postsQueryKeys._def })
      await queryClient.invalidateQueries({ queryKey: tagQueryKeys._def })
      queryClient.setQueryData(postsQueryKeys.get(updatedPost.id).queryKey, updatedPost)
      queryClient.setQueryData(postsQueryKeys.get(updatedPost.slug).queryKey, updatedPost)
    },
  })
}
