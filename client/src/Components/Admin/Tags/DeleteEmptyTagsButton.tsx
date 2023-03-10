import { faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Stack, Typography } from '@mui/material'
import React, { FC, useState } from 'react'

import { noop } from '../../../Lib/Noop'
import { TagData } from '../../Tags/TagData'
import { useDeleteEmptyTags$ } from '../../Tags/TagsApi/DeleteEmptyTags'

interface DeleteTagButtonProps {
  fullWidth?: boolean
  onDeleted?: (tags: TagData[]) => void
}

export const DeleteEmptyTagsButton: FC<DeleteTagButtonProps> = ({
  fullWidth,
  onDeleted = noop,
}) => {
  const deleteTags$ = useDeleteEmptyTags$()
  const [ promptOpen, setPromptOpen ] = useState<boolean>(false)

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
          <DialogContentText>Are you sure you want to delete all empty tags?</DialogContentText>
        </DialogContent>
        <DialogActions>
          {deleteTags$.isLoading ? (
            <Stack gap={2} direction="row">
              <FontAwesomeIcon icon={faSpinner} spin />
              <Typography>Deleting...</Typography>
            </Stack>
          ) : (
            <>
              <Button onClick={() => setPromptOpen(false)}>Cancel</Button>
              <Button onClick={onDelete} color="error" variant="contained">Delete</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}
