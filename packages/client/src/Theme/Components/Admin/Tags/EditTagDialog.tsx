import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { Button, Dialog, DialogContent, Stack } from "@mui/material"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { TagData, useTag$, useUpdateTag$ } from "../../../../Lib"
import { FontAwesomeIcon } from "../../Icons"

import { DeleteTagButton } from "./DeleteTagButton"
import { MergeTagButton } from "./MergeTagsButton"
import { TagForm } from "./TagForm"

interface EditTagDialogProps {
  tagId: TagData["id"]
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
  tagId: TagData["id"]
  onClose: () => void
}

const EditTagDialogContent: FC<EditTagDialogContentProps> = ({
  tagId,
  onClose,
}) => {
  const tag$ = useTag$({ tagId })
  const editTag$ = useUpdateTag$()

  const formData = tag$.data
    ? {
        tag: tag$.data,
      }
    : undefined

  const form = useForm<{ tag: TagData }>({ values: formData })

  if (tag$.isPending) return <DialogContent>Loading...</DialogContent>
  if (tag$.isError)
    return <DialogContent>Error: {String(tag$.error)}</DialogContent>
  const tag = tag$.data

  const onSubmit = form.handleSubmit(async ({ tag }) => {
    await editTag$.mutateAsync({ tagId: tag.id, tag: tag })
    onClose()
  })

  return (
    <DialogContent>
      <Stack gap={4}>
        <TagForm control={form.control} disabled={editTag$.isPending} />

        <Stack direction="row" gap={1} justifyContent="space-between">
          <Stack direction="row" gap={1}>
            <MergeTagButton srcTag={tag} onMerged={onClose} />
            <DeleteTagButton tag={tag} onDeleted={onClose} />
          </Stack>

          <Stack direction="row" gap={1}>
            <Button
              variant="outlined"
              onClick={onClose}
              disabled={editTag$.isPending}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={onSubmit}
              disabled={editTag$.isPending}
              startIcon={
                editTag$.isPending ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : null
              }
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </DialogContent>
  )
}
