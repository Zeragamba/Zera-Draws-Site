import { Button, Stack } from '@mui/material'
import { FC } from 'react'

import { Post, usePost } from '../../../Lib/ServerApi'
import { useEditPost } from '../../../Lib/ServerApi/EndPoints/Posts/EditPost'
import { noOp } from '../../../Lib/util'
import { Glass } from '../../UI/Glass'
import { OnPostSubmitHandler, PostForm } from './PostForm'
import { PublishToggle } from './PublishToggle'

interface ViewPostProps {
  postId: string
  onUpdated?: (post: Post) => void
}

export const EditPostForm: FC<ViewPostProps> = ({
  postId,
  onUpdated = noOp,
}) => {
  const post$ = usePost({ postId })
  const editPost$ = useEditPost()

  if (post$.isLoading) {
    return <Glass>Loading...</Glass>
  } else if (post$.isError) {
    return <Glass>Error Loading Post :( {String(post$.error)}</Glass>
  }

  const post = post$.data

  const onPostSave: OnPostSubmitHandler = async ({ post, imageChanges }) => {
    const saved = await editPost$.mutateAsync({ postId, post, images: imageChanges })
    onUpdated(saved)
  }

  const onPublishToggle = () => {
    editPost$.mutate({ postId, post: { released: !post.released } })
  }

  return (
    <PostForm
      post={post}
      onSubmit={onPostSave}
      actions={(submitForm) => (
        <Stack gap={1}>
          <Button
            variant={'contained'}
            disabled={editPost$.isLoading}
            onClick={submitForm}
            fullWidth
          >Save</Button>
          <PublishToggle
            released={post.released}
            onClick={onPublishToggle}
            disabled={editPost$.isLoading}
            variant={'outlined'}
            fullWidth
          />
        </Stack>
      )}
    />
  )
}
