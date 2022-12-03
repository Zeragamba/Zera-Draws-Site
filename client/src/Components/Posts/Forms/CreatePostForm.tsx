import { Button, Stack } from '@mui/material'
import { isError } from '@tanstack/react-query'
import { FC, useState } from 'react'

import { EditableImage, Image, Post, useCreatePost } from '../../../Lib/ServerApi'
import { noOp } from '../../../Lib/util'
import { useImageManager } from '../../Images/ImageManager/UseImageManager'
import { PostForm } from './PostForm'
import { PublishToggle } from './PublishToggle'

interface CreatePostFormProps {
  onCreated?: (post: Post) => void
}

export const CreatePostForm: FC<CreatePostFormProps> = ({
  onCreated = noOp,
}) => {
  const createPost$ = useCreatePost()
  const imageManager = useImageManager()
  const [ post, setPost ] = useState<Post>({
    id: '',
    title: '',
    date: '',
    slug: '',
    order: 0,
    tags: [],
    images: [],
    released: false,
    description: '',
  })

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
    const images: Required<EditableImage>[] = imageManager.images
      .filter(image => image.file)
      .map((image) => {
        return {
          filename: image.filename,
          order: image.order,
          file: image.file as File,
        }
      })

    const saved = await createPost$.mutateAsync({ post, images })
    onCreated(saved)
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
            disabled={createPost$.isLoading}
            onClick={onPostSave}
            fullWidth
          >Save</Button>
          <PublishToggle
            released={post.released}
            onClick={() => onEdit({ released: !post.released })}
            disabled={createPost$.isLoading}
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
