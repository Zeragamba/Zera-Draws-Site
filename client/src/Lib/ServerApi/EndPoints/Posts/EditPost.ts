import { useMutation, UseMutationResult, useQueryClient } from 'react-query'

import { EditablePost, Post } from '../../Models'
import { ServerClient } from '../../ServerClient'
import { QueryKeys } from '../QueryKeys'
import { ModelResponse } from '../Response'

export type EditPostRes = ModelResponse<'post', Post>
export type EditPostReq = { post: Partial<EditablePost> }

type Params = { postId: Post['id']; post: Partial<EditablePost> }

export const editPost = ({ postId, post }: Params): Promise<Post> => {
  return ServerClient.patch<EditPostRes, EditPostReq>(`/posts/${postId}`, { post })
    .then(res => res.post)
}

export const useEditPost = (): UseMutationResult<Post, unknown, Params> => {
  const queryClient = useQueryClient()

  return useMutation<Post, unknown, Params>(editPost, {
    onMutate: async ({ postId, post }) => {
      const getPostKey = QueryKeys.posts.getPost(postId)
      const savedPost = queryClient.getQueryData(getPostKey)
      queryClient.setQueryData(getPostKey, { savedPost, ...post })
    },
    onSuccess: async (updatedPost) => {
      await queryClient.invalidateQueries(QueryKeys.posts.prefix())
      queryClient.setQueryData(QueryKeys.posts.getPost(updatedPost.id), updatedPost)
    },
  })
}
