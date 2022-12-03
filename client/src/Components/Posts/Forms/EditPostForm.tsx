import { Button, Stack } from '@mui/material'
import { isError } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { EditableImage, Image, Post, usePost } from '../../../Lib/ServerApi'
import { useEditPost } from '../../../Lib/ServerApi/EndPoints/Posts/EditPost'
import { useImageManager } from '../../Images/ImageManager/UseImageManager'
import { Glass } from '../../UI/Glass'
import { PostForm } from './PostForm'
import { PublishToggle } from './PublishToggle'

interface ViewPostProps {
  postId: string
}

export const EditPostForm: FC<ViewPostProps> = ({
  postId,
}) => {
  const navigate = useNavigate()
  const editPost$ = useEditPost()
  const [ post, setPost ] = useState<Post | null>(null)
  const imageManager = useImageManager()

  const post$ = usePost({ postId, enabled: post === null })

  useEffect(() => {
    const updatedPost = post$.data
    if (post || !updatedPost) return

    setPost(updatedPost)
    imageManager.setImages(updatedPost?.images)
  }, [ post$.data ])

  if (post$.isLoading) {
    return <Glass>Loading...</Glass>
  } else if (post$.isError) {
    return <Glass>Error Loading Post :( {formatError(post$.error)}</Glass>
  } else if (!post$.data || !post) {
    return <Glass>Unable to load post</Glass>
  }

  const onImageAdd = (added: Required<EditableImage>) => {
    imageManager.addImage({ id: `add-${added.filename}`, ...added })
  }

  const onImageEdit = (edited: Image, changes: Partial<EditableImage>) => {
    imageManager.editImage({ id: edited.id, ...changes })
  }

  const onImageRemove = (removed: Image) => {
    imageManager.removeImage({ id: removed.id })
  }

  const onPostSave = async () => {
    const saved = await editPost$.mutateAsync({ postId, post, images: imageManager.changes })
    navigate(`/post/${saved.slug}`)
  }

  const onPublishToggle = async () => {
    if (!post) return
    setPost({ ...post, released: !post.released })

    const saved = await editPost$.mutateAsync({ postId, post: { released: !post.released } })
    setPost((post) => {
      if (post) {
        post = { ...post, released: saved.released }
      }

      return post
    })
  }

  const onEdit = (changes: Partial<Post>) => {
    if (!post) return
    setPost({ ...post, ...changes })
  }

  return (
    <PostForm
      post={{ ...post, images: imageManager.images }}
      onImageRemove={onImageRemove}
      onImageEdit={onImageEdit}
      onImageAdd={onImageAdd}
      onEdit={onEdit}
      actions={
        <Stack gap={1}>
          <Button
            variant={'contained'}
            disabled={editPost$.isLoading}
            onClick={onPostSave}
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
      }
    />
  )

}

function formatError(error: unknown): string {
  if (isError(error)) return error.toString()
  return `${error}`
}
