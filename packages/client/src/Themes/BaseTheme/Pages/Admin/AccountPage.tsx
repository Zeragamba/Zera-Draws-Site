import Stack from '@mui/material/Stack'
import { FC } from 'react'

import { Passkeys } from '../../Components/Admin/Account/Passkeys'

export const AccountPage: FC = () => {
  return (
    <Stack gap={2}>
      <Passkeys />
    </Stack>
  )
}
