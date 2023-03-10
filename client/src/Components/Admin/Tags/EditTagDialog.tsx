import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Dialog, DialogContent, Stack, TextField } from '@mui/material'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { DeleteTagButton } from './DeleteTagButton'
import { MergeTagButton } from './MergeTagsButton'
import { formatSlug } from '../../../Lib/FilenameUtils'
import { TagData } from '../../Tags/TagData'
import { useTag } from '../../Tags/TagsApi'
import { useEditTag } from '../../Tags/TagsApi/EditTag'

interface EditTagDialogProps {
  tagId: TagData['id']
  open: boolean
  onClose: () => void
}

export const EditTagDialog: FC<EditTagDialogProps> = ({
  tagId,
  onClose,
  open,
}) => {

  return (
    <Dialog open={open} fullWidth>
      <EditTagDialogContent tagId={tagId} onClose={onClose} />
    </Dialog>
  )
}

interface EditTagDialogContentProps {
  tagId: TagData['id']
  onClose: () => void
}

const EditTagDialogContent: FC<EditTagDialogContentProps> = ({
  tagId,
  onClose,
}) => {
  const tag$ = useTag({ tag: tagId })
  const editTag$ = useEditTag()
  const form = useForm<TagData>({ values: tag$.data })

  if (tag$.isLoading) return <DialogContent>Loading...</DialogContent>
  if (tag$.isError) return <DialogContent>Error: {String(tag$.error)}</DialogContent>
  const tag = tag$.data

  const onSubmit = form.handleSubmit(async (tag) => {
    await editTag$.mutateAsync({ tagId: tag.id, tag: tag })
    onClose()
  })

  return (
    <DialogContent>
      <Stack gap={4}>
        <Controller
          control={form.control}
          name="name"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              label="name"
              value={field.value}
              size="small"
              required
              onChange={field.onChange}
              disabled={editTag$.isLoading}
            />
          )}
        />

        <Controller
          control={form.control}
          name="slug"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              label="slug"
              value={field.value}
              size="small"
              required
              onChange={(event) => field.onChange(formatSlug(event.target.value))}
              disabled={editTag$.isLoading}
              helperText="Warning: Changing the slug will break links and bookmarks"
            />
          )}
        />

        <Stack direction="row" gap={1} justifyContent="space-between">
          <Stack direction="row" gap={1}>
            <MergeTagButton srcTag={tag} onMerged={onClose} />
            <DeleteTagButton tag={tag} onDeleted={onClose} />
          </Stack>

          <Stack direction="row" gap={1}>
            <Button
              variant="outlined"
              onClick={onClose}
              disabled={editTag$.isLoading}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={onSubmit}
              disabled={editTag$.isLoading}
              startIcon={editTag$.isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : null}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </DialogContent>
  )
}
