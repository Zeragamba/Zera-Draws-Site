import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Dialog } from '@mui/material'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC, useState } from 'react'

import { PasskeyForm } from './PasskeyForm'
import { UserPasskeysList } from './PasskeysList'
import { FontAwesomeIcon } from '../../../../../Lib'

export const Passkeys: FC = () => {
  const [ creatingPasskey, setCreatingPasskey ] = useState<boolean>(false)

  return (
    <Paper>
      <Stack padding={2} gap={2}>
        <Stack direction={'row'}>
          <Typography variant="h2" flexGrow={1}>Passkeys</Typography>
          <Button
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            variant="contained"
            onClick={() => setCreatingPasskey(true)}
          >
            Add Passkey
          </Button>
        </Stack>

        <Divider />

        <UserPasskeysList />
      </Stack>

      <Dialog open={creatingPasskey} onClose={() => setCreatingPasskey(false)}>
        <PasskeyForm
          mode={'create'}
          onSaved={() => setCreatingPasskey(false)}
        />
      </Dialog>
    </Paper>
  )
}
