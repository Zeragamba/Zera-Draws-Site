import { Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { AppNavBar } from '../UI/AppNavBar'
import { Layout } from './Layout'

export const AdminLayout: Layout = ({ children }) => {
  return (
    <Stack gap={1}>
      <AppNavBar />
      {children}
      <Outlet />
    </Stack>
  )
}
