import { Button, LinearProgress, Stack } from '@mui/material'
import { FC, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { PostForm } from './PostForm'
import { noOp } from '../../../Lib/Noop'
import { EditableImage } from '../../Images/ImageData'
import { useImageManager } from '../../Images/ImageManager/UseImageManager'
import { createPostData, PostData } from '../PostData'
import { useCreatePost$ } from '../PostsApi'

interface CreatePostFormProps {
  onCreated?: (post: PostData) => void
}

export const CreatePostForm: FC<CreatePostFormProps> = ({
  onCreated = noOp,
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
      onUploadProgress: (progress) => setUploadProgress(progress),
    })

    onCreated(saved)
  })

  return (
    <PostForm
      form={form}
      mode="create"
      imageManager={imageManager}
      slots={{
        actions: (
          <Stack gap={1}>
            <Button
              variant={'contained'}
              disabled={createPost$.isLoading}
              onClick={onPostSave}
              fullWidth
            >Save</Button>
            {uploadProgress !== 0 && <LinearProgress value={uploadProgress * 100} />}
          </Stack>
        ),
      }}
    />
  )
}
