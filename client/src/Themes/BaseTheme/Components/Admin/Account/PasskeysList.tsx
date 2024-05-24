import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import formatDate from 'date-fns/format'
import { FC } from 'react'

import { PasskeyData } from '../../../../../Api/Schemas'
import { useUserPasskeys$ } from '../../../../../Queries'
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
      {passkeys.map((passkey) => <PasskeyListItem key={passkey.name} passkey={passkey} />)}
    </Stack>
  )
}

interface PasskeyListItemProps {
  passkey: PasskeyData
}

export const PasskeyListItem: FC<PasskeyListItemProps> = ({
  passkey,
}) => {
  return (
    <Paper sx={{ padding: 1 }}>
      <Typography>{passkey.name}</Typography>
      {passkey.createdAt && <Typography>Created at: {formatDate(passkey.createdAt, 'PPPP')}</Typography>}
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
