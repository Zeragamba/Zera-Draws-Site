import { Stack } from '@mui/material'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { AppNavBar } from '../AppNavBar'

export const AdminLayout: FC = () => {
  return (
    <Stack gap={1}>
      <AppNavBar />
      <Outlet />
    </Stack>
  )
}
