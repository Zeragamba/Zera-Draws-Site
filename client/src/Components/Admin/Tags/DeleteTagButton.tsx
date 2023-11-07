import { faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Stack, Typography } from '@mui/material'
import React, { FC, useState } from 'react'

import { noop } from '../../../Lib/Noop'
import { TagData } from '../../Tags/TagData'
import { useDeleteTag$ } from '../../Tags/TagsApi/DeleteTag'

interface DeleteTagButtonProps {
  tag: TagData
  fullWidth?: boolean
  onDeleted?: (tag: TagData) => void
}

export const DeleteTagButton: FC<DeleteTagButtonProps> = ({
  tag,
  fullWidth,
  onDeleted = noop,
}) => {
  const deleteTag$ = useDeleteTag$()
  const [ promptOpen, setPromptOpen ] = useState<boolean>(false)

  const onDelete = async () => {
    const deletedTag = await deleteTag$.mutateAsync({ tagId: tag.id })
    setPromptOpen(false)
    onDeleted(deletedTag)
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
        Delete Tag
      </Button>

      <Dialog open={promptOpen}>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete the tag {tag.name}?</DialogContentText>
          {tag.num_posts >= 5 && <DialogContentText>It is attached to {tag.num_posts} posts</DialogContentText>}
        </DialogContent>
        <DialogActions>
          {deleteTag$.isPending ? (
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
