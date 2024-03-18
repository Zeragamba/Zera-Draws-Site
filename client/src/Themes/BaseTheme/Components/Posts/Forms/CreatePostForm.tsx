import { Button, Stack } from '@mui/material'
import { FC, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { PostForm } from './PostForm'
import { createPostData, EditableImage, noop, PostData, useImageManager } from '../../../../../Lib'
import { useCreatePost$ } from '../../../../../Queries'
import { ErrorAlert, UploadProgress } from '../../Shared'

interface CreatePostFormProps {
  onCreated?: (post: PostData) => void
}

export const CreatePostForm: FC<CreatePostFormProps> = ({
  onCreated = noop,
}) => {
  const post = useMemo(() => createPostData(), [])

  const form = useForm({ values: post })
  const imageManager = useImageManager({ images: post?.images || [] })
  const [ uploadProgress, setUploadProgress ] = useState<number>(0)

  const createPost$ = useCreatePost$()

  const onPostSave = form.handleSubmit(async (post) => {
    const createdImages: Required<EditableImage>[] = imageManager.images
      .filter(image => image.file)
      .sort((a, b) => b.position - a.position)
      .map((image) => {
        return {
          filename: image.filename,
          position: image.position,
          file: image.file as File,
        }
      })

    const saved = await createPost$.mutateAsync({
      post,
      images: createdImages,
      onUploadProgress: (progress) => setUploadProgress(() => progress),
    })

    onCreated(saved)
  })

  return (
    <Stack gap={2}>
      {createPost$.isError && <ErrorAlert error={createPost$.error} />}

      <PostForm
        form={form}
        mode="create"
        imageManager={imageManager}
        slots={{
          actions: (
            <Stack gap={1}>
              <Button
                variant={'contained'}
                disabled={createPost$.isPending}
                onClick={onPostSave}
                fullWidth
              >Save</Button>
              {uploadProgress !== 0 && <UploadProgress value={uploadProgress} />}
            </Stack>
          ),
        }}
      />
    </Stack>
  )
}
