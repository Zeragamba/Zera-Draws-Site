import { Button, Paper, Stack } from '@mui/material'
import { FC } from 'react'

import { OnPostSubmitHandler, PostForm } from './PostForm'
import { noop } from '../../../Lib/Noop'
import { PostData } from '../PostData'
import { usePost } from '../PostsApi'
import { useEditPost$ } from '../PostsApi/EditPost'

interface ViewPostProps {
  postId: string
  onUpdated?: (post: PostData) => void
  onCancel?: () => void
  onDeleted?: (post: PostData) => void
}

export const EditPostForm: FC<ViewPostProps> = ({
  postId,
  onUpdated = noop,
  onCancel = noop,
  onDeleted = noop,
}) => {
  const post$ = usePost({ postId })
  const editPost$ = useEditPost$()

  if (post$.isLoading) {
    return <Paper>Loading...</Paper>
  } else if (post$.isError) {
    return <Paper>Error Loading Post :( {String(post$.error)}</Paper>
  }

  const post = post$.data

  const onPostSave: OnPostSubmitHandler = async ({ post, imageChanges }) => {
    const saved = await editPost$.mutateAsync({ postId, post, images: imageChanges })
    onUpdated(saved)
  }

  return (
    <PostForm
      mode="edit"
      post={post}
      onSubmit={onPostSave}
      onDeleted={onDeleted}
      actions={(submitForm) => (
        <Stack gap={2}>
          <Button
            variant={'contained'}
            disabled={editPost$.isLoading}
            onClick={submitForm}
            fullWidth
          >Save</Button>
          <Button
            variant="outlined"
            disabled={editPost$.isLoading}
            onClick={onCancel}
            fullWidth
          >Cancel</Button>
        </Stack>
      )}
    />
  )
}
