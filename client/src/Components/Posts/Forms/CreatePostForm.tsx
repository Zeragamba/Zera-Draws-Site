import { Button, Stack } from '@mui/material'
import { addDays, setHours, setMinutes } from 'date-fns'
import { FC } from 'react'

import { OnPostSubmitHandler, PostForm } from './PostForm'
import { noOp } from '../../../Lib/Noop'
import { EditableImage } from '../../Images/ImageData'
import { PostData } from '../PostData'
import { useCreatePost$ } from '../PostsApi'

interface CreatePostFormProps {
  onCreated?: (post: PostData) => void
}

export const CreatePostForm: FC<CreatePostFormProps> = ({
  onCreated = noOp,
}) => {
  const createPost$ = useCreatePost$()

  let scheduledDate = new Date()

  if (scheduledDate.getHours() >= 8) {
    scheduledDate = addDays(scheduledDate, 1)
  }

  scheduledDate = setHours(scheduledDate, 8)
  scheduledDate = setMinutes(scheduledDate, 0)

  const post = {
    id: '',
    title: '',
    date: new Date().toISOString(),
    slug: '',
    position: 0,
    tags: [],
    images: [],
    released: true,
    description: '',
    scheduled: scheduledDate.toISOString(),
  }

  const onPostSave: OnPostSubmitHandler = async ({ post, images }) => {
    const createdImages: Required<EditableImage>[] = images
      .filter(image => image.file)
      .map((image) => {
        return {
          filename: image.filename,
          position: image.position,
          file: image.file as File,
        }
      })

    const saved = await createPost$.mutateAsync({ post, images: createdImages })
    onCreated(saved)
  }

  return (
    <PostForm
      mode="create"
      post={post}
      onSubmit={onPostSave}
      actions={(submitForm) => (
        <Stack gap={1}>
          <Button
            variant={'contained'}
            disabled={createPost$.isLoading}
            onClick={submitForm}
            fullWidth
          >Save</Button>
        </Stack>
      )}
    />
  )
}
