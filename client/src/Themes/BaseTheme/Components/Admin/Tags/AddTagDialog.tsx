import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Button, Dialog, DialogContent, Stack } from '@mui/material'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { TagForm } from './TagForm'
import { buildTagData, FontAwesomeIcon, TagData, useCreateTag$ } from '../../../../../Lib'

interface AddTagDialogProps {
  open: boolean
  onClose: () => void
}

export const AddTagDialog: FC<AddTagDialogProps> = ({
  onClose,
  open,
}) => {
  return (
    <Dialog open={open} fullWidth>
      <EditTagDialogContent onClose={onClose} />
    </Dialog>
  )
}

interface AddTagDialogContentProps {
  onClose: () => void
}

const defaultTagData = buildTagData()

const EditTagDialogContent: FC<AddTagDialogContentProps> = ({
  onClose,
}) => {
  const createTag$ = useCreateTag$()
  const form = useForm<{ tag: TagData }>({
    values: { tag: defaultTagData },
  })

  const onSubmit = form.handleSubmit(async ({ tag }) => {
    await createTag$.mutateAsync({ tag: tag })
    onClose()
  })

  return (
    <DialogContent>
      <Stack gap={4}>
        <TagForm control={form.control} disabled={createTag$.isPending} />

        <Stack direction="row" gap={1} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={createTag$.isPending}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={onSubmit}
            disabled={createTag$.isPending}
            startIcon={createTag$.isPending ? <FontAwesomeIcon icon={faSpinner} spin /> : null}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </DialogContent>
  )
}
