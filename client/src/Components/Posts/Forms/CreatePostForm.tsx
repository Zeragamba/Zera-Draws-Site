import { Button, Stack } from '@mui/material'
import { FC } from 'react'

import { noOp } from '../../../Lib/Noop'
import { EditableImage } from '../../Images/Image'
import { Post } from '../Post'
import { useCreatePost } from '../PostsApi'
import { OnPostSubmitHandler, PostForm } from './PostForm'
import { PublishToggle } from './PublishToggle'

interface CreatePostFormProps {
  onCreated?: (post: Post) => void
}

export const CreatePostForm: FC<CreatePostFormProps> = ({
  onCreated = noOp,
}) => {
  const createPost$ = useCreatePost()
  const post = {
    id: '',
    title: '',
    date: '',
    slug: '',
    order: 0,
    tags: [],
    images: [],
    released: false,
    description: '',
  }

  const onPostSave: OnPostSubmitHandler = async ({ post, images }) => {
    console.log(post, images)
    const createdImages: Required<EditableImage>[] = images
      .filter(image => image.file)
      .map((image) => {
        return {
          filename: image.filename,
          order: image.order,
          file: image.file as File,
        }
      })

    const saved = await createPost$.mutateAsync({ post, images: createdImages })
    onCreated(saved)
  }

  return (
    <PostForm
      post={post}
      onSubmit={onPostSave}
      actions={(submitForm, setValue) => (
        <Stack gap={1}>
          <Button
            variant={'contained'}
            disabled={createPost$.isLoading}
            onClick={submitForm}
            fullWidth
          >Save</Button>
          <PublishToggle
            released={post.released}
            onClick={() => setValue('released', !post.released)}
            disabled={createPost$.isLoading}
            variant={'outlined'}
            fullWidth
          />
        </Stack>
      )}
    />
  )
}
