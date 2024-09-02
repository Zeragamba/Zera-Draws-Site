import { Button, Stack } from "@mui/material"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"

import { DeletePostButton } from "./DeletePostButton"
import { PostForm } from "./PostForm"
import {
  noop,
  PostData,
  useImageManager,
  useUpdatePost$,
} from "../../../../Lib"
import { ErrorAlert, UploadProgress } from "../../Shared"

export interface EditPostFormProps {
  post: PostData
  onSaved?: (post: PostData) => void
  onCancel?: () => void
  onDelete?: () => void
}

export const EditPostForm: FC<EditPostFormProps> = ({
  post,
  onSaved = noop,
  onCancel = noop,
  onDelete = noop,
}) => {
  const form = useForm({ values: post })
  const imageManager = useImageManager({ images: post?.images || [] })
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const editPost$ = useUpdatePost$()

  const onPostSave = form.handleSubmit(async (post) => {
    const saved = await editPost$.mutateAsync({
      postId: post.id,
      post,
      changes: imageManager.changes,
      onUploadProgress: (progress) => setUploadProgress(progress),
    })

    onSaved(saved)
  })

  return (
    <Stack gap={2}>
      {editPost$.isError && <ErrorAlert error={editPost$.error} />}

      <PostForm
        form={form}
        mode="edit"
        imageManager={imageManager}
        slots={{
          actions: (
            <Stack gap={2}>
              <Button
                variant={"contained"}
                disabled={editPost$.isPending}
                onClick={onPostSave}
                fullWidth
              >
                Save
              </Button>
              <Button
                variant="outlined"
                disabled={editPost$.isPending}
                onClick={onCancel}
                fullWidth
              >
                Cancel
              </Button>
              {uploadProgress !== 0 && (
                <UploadProgress value={uploadProgress} />
              )}
            </Stack>
          ),
          rightCol: (
            <DeletePostButton
              post={post}
              fullWidth
              onDeleted={onDelete}
              disabled={editPost$.isPending}
            />
          ),
        }}
      />
    </Stack>
  )
}
