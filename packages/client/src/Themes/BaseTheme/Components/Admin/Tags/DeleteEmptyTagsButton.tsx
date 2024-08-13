import { faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Stack,
  Typography,
} from "@mui/material"
import { FC, useState } from "react"

import { FontAwesomeIcon, noop } from "../../../../../Lib"
import { TagData } from "../../../../../Models"
import { useDeleteEmptyTags$ } from "../../../../../Queries"

interface DeleteTagButtonProps {
  fullWidth?: boolean
  onDeleted?: (tags: TagData[]) => void
}

export const DeleteEmptyTagsButton: FC<DeleteTagButtonProps> = ({
  fullWidth,
  onDeleted = noop,
}) => {
  const deleteTags$ = useDeleteEmptyTags$()
  const [promptOpen, setPromptOpen] = useState<boolean>(false)

  const onDelete = async () => {
    const deletedTags = await deleteTags$.mutateAsync()
    setPromptOpen(false)
    onDeleted(deletedTags)
  }

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        onClick={() => setPromptOpen(true)}
        fullWidth={fullWidth}
        startIcon={<FontAwesomeIcon icon={faTrash} />}
      >
        Delete All Unused Tags
      </Button>

      <Dialog open={promptOpen}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete all empty tags?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {deleteTags$.isPending ? (
            <Stack gap={2} direction="row">
              <FontAwesomeIcon icon={faSpinner} spin />
              <Typography>Deleting...</Typography>
            </Stack>
          ) : (
            <>
              <Button onClick={() => setPromptOpen(false)}>Cancel</Button>
              <Button onClick={onDelete} color="error" variant="contained">
                Delete
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}
