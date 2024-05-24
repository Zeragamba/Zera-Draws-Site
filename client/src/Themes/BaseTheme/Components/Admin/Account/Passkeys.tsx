import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Dialog } from '@mui/material'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useQueryClient } from '@tanstack/react-query'
import { FC, useState } from 'react'

import { PasskeyForm } from './PasskeyForm'
import { UserPasskeysList } from './PasskeysList'
import { PasskeyData } from '../../../../../Api/Schemas'
import { FontAwesomeIcon } from '../../../../../Lib'
import { queryKeys } from '../../../../../Queries/QueryKeys'

export const Passkeys: FC = () => {
  const queryClient = useQueryClient()
  const [ editingPasskey, setEditingPasskey ] = useState<PasskeyData | null>(null)
  const [ creatingPasskey, setCreatingPasskey ] = useState<boolean>(false)

  const onPasskeySaved = (passkey: PasskeyData) => {
    queryClient.setQueryData(queryKeys.auth.passkeys.queryKey, (passkeys: PasskeyData[] = []) => {
      if (passkeys.map((key) => key.name).includes(passkey.name)) {
        return passkeys.map((key) => {
          return key.name === passkey.name ? passkey : key
        })
      } else {
        return [ ...passkeys, passkey ]
      }
    })
  }

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

      <Dialog open={!!editingPasskey} onClose={() => setEditingPasskey(null)}>
        <PasskeyForm
          mode={'edit'}
          onSaved={(passkey) => {
            onPasskeySaved(passkey)
            setEditingPasskey(null)
          }}
        />
      </Dialog>

      <Dialog open={creatingPasskey} onClose={() => setCreatingPasskey(false)}>
        <PasskeyForm
          mode={'create'}
          onSaved={(passkey) => {
            onPasskeySaved(passkey)
            setCreatingPasskey(false)
          }}
        />
      </Dialog>
    </Paper>
  )
}
