import { Dialog } from '@mui/material'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import formatDate from 'date-fns/format'
import { FC, useState } from 'react'

import { PasskeyForm } from './PasskeyForm'
import { PasskeyData } from '../../../../../Api/Schemas'
import { useRemovePasskey$, useUserPasskeys$ } from '../../../../../Queries'
import { ErrorAlert, LoadingSpinner } from '../../Shared'

interface PasskeysListSlots {
  PasskeyListItem: FC<{ passkey: PasskeyData }>
  NoPasskeys: FC
}

interface PasskeysListProps {
  passkeys: PasskeyData[]
  slots?: Partial<PasskeysListSlots>
}

export const PasskeysList: FC<PasskeysListProps> = ({
  passkeys,
  slots,
}) => {
  const { PasskeyListItem, NoPasskeys } = {
    ...defaultSlots,
    ...slots,
  }

  return (
    <Stack gap={1}>
      {passkeys.length === 0 && <NoPasskeys />}
      {passkeys.map((passkey) => <PasskeyListItem key={passkey.id} passkey={passkey} />)}
    </Stack>
  )
}

interface PasskeyListItemProps {
  onEdit?: (passkey: PasskeyData) => void
  passkey: PasskeyData
}

export const PasskeyListItem: FC<PasskeyListItemProps> = ({
  passkey,
}) => {
  const removePasskey = useRemovePasskey$()
  const [ isRemoving, setIsRemoving ] = useState<boolean>(false)
  const [ isEditing, setIsEditing ] = useState<boolean>(false)

  return (
    <Paper sx={{ padding: 2 }}>
      <Stack direction="row" gap={2}>
        <Stack flexGrow={1}>
          <Typography>{passkey.name}</Typography>
          {passkey.createdAt && (
            <Typography variant={'caption'}>Created: {formatDate(passkey.createdAt, 'PPP')}</Typography>
          )}
        </Stack>

        <Button variant={'contained'} onClick={() => setIsRemoving(true)}>Remove</Button>
        <Button variant={'contained'} onClick={() => setIsEditing(true)}>Edit</Button>
      </Stack>

      <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
        <PasskeyForm
          mode={'edit'}
          passkey={passkey}
          onSaved={() => setIsEditing(false)}
        />
      </Dialog>

      <Dialog open={isRemoving} onClose={() => setIsRemoving(false)}>
        <Stack gap={2} padding={2}>
          <Typography>Are you sure you want to remove the passkey {passkey.name}?</Typography>

          <Stack direction="row" gap={2}>
            <Button
              fullWidth
              variant={'contained'}
              onClick={() => removePasskey.mutate(passkey)}
            >
              Remove
            </Button>
            <Button
              fullWidth
              variant={'contained'}
              onClick={() => setIsRemoving(false)}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </Paper>
  )
}

interface UserPasskeysListSlots extends PasskeysListSlots {
  PasskeysList: FC<PasskeysListProps>
  LoadingSpinner: FC
  ErrorAlert: FC<{ error: unknown }>
}

export interface UserPasskeysListProps {
  slots?: Partial<UserPasskeysListSlots>
}

export const UserPasskeysList: FC<UserPasskeysListProps> = ({
  slots,
}) => {
  const { LoadingSpinner, ...listSlots } = {
    ...defaultSlots,
    ...slots,
  }

  const passkeys$ = useUserPasskeys$()
  if (passkeys$.isFetching) return <LoadingSpinner />
  if (passkeys$.isError) return <ErrorAlert error={passkeys$.error} />
  const passkeys = passkeys$.data || []

  return <PasskeysList passkeys={passkeys} slots={listSlots} />
}

const defaultSlots: PasskeysListSlots & UserPasskeysListSlots = {
  PasskeysList,
  PasskeyListItem,
  NoPasskeys: () => <Typography>No Passkeys registered</Typography>,
  LoadingSpinner,
  ErrorAlert,
}
