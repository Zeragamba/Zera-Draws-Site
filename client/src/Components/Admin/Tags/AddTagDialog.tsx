import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Dialog, DialogContent, Stack, TextField } from '@mui/material'
import { FC, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { formatSlug } from '../../../Lib/FilenameUtils'
import { EditableTagData } from '../../Tags/TagData'
import { useCreateTag$ } from '../../Tags/TagsApi'

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

const EditTagDialogContent: FC<AddTagDialogContentProps> = ({
  onClose,
}) => {
  const createTag$ = useCreateTag$()
  const form = useForm<EditableTagData>({ values: { name: '', slug: '' } })

  useEffect(() => {
    const subscription = form.watch((post, { name }) => {
      switch (name) {
        case 'name':
          if (form.formState.dirtyFields.slug) return
          form.setValue('slug', formatSlug(post.name || ''))
          break
      }
    })

    return () => subscription.unsubscribe()
  }, [ form.watch, form.setValue, form.formState ])

  const onSubmit = form.handleSubmit(async (tag) => {
    await createTag$.mutateAsync({ tag: tag })
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
              disabled={createTag$.isLoading}
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
              disabled={createTag$.isLoading}
            />
          )}
        />

        <Stack direction="row" gap={1} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={createTag$.isLoading}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={onSubmit}
            disabled={createTag$.isLoading}
            startIcon={createTag$.isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : null}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </DialogContent>
  )
}
