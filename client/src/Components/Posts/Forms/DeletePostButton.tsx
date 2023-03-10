import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material'
import React, { FC, useState } from 'react'

import { noop } from '../../../Lib/Noop'
import { PostData } from '../PostData'
import { useDeletePost } from '../PostsApi/DeletePost'

interface DeletePostButtonProps {
  post: PostData
  fullWidth?: boolean
  onDeleted?: (post: PostData) => void
}

export const DeletePostButton: FC<DeletePostButtonProps> = ({
  post,
  fullWidth = false,
  onDeleted = noop,
}) => {
  const deletePostQuery = useDeletePost()
  const [ promptOpen, setPromptOpen ] = useState<boolean>(false)

  const onDelete = async () => {
    await deletePostQuery.mutateAsync({ postId: post.id })
    onDeleted(post)
  }

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        onClick={() => setPromptOpen(true)}
        fullWidth={fullWidth}
      >
        Delete Post
      </Button>

      <Dialog open={promptOpen}>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this post?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPromptOpen(false)}>Cancel</Button>
          <Button onClick={onDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
