import { Paper } from '@mui/material'
import { FC } from 'react'

import { PublicLayout } from '../../Layouts'

export const AuthorizingPage: FC = () => {
  return (
    <PublicLayout>
      <Paper sx={{ textAlign: 'center', padding: 4 }}>Authorizing</Paper>
    </PublicLayout>
  )
}
