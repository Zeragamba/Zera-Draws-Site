import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@mui/material'
import { FC, useState } from 'react'

import { AddTagDialog } from './AddTagDialog'
import { FontAwesomeIcon } from '../../../../../Lib'


export const AddTagButton: FC = () => {
  const [ dialogOpen, setDialogOpen ] = useState<boolean>(false)

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        sx={{ alignItems: 'stretch' }}
        startIcon={<FontAwesomeIcon icon={faPlus} />}
        onClick={() => setDialogOpen(true)}
      >
        Add
      </Button>

      <AddTagDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  )
}
