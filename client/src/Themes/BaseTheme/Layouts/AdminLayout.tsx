import { Box, Paper, Stack } from '@mui/material'
import React, { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useIsAdmin } from '../../../Lib'
import { useCurrentUser$ } from '../../../Queries'
import { AdminNavItem } from '../Components'
import { AuthorizingPage, LoginPage } from '../Pages'


export const AdminLayout: FC = () => {
  const userQuery = useCurrentUser$()
  const isAdmin = useIsAdmin()

  if (userQuery.isFetching) return <AuthorizingPage />
  if (!userQuery.data) return <LoginPage />
  if (!isAdmin) return <Navigate to={'/'} />

  return (
    <Stack gap={2} direction={'row'} sx={{ flexGrow: 1, height: '100%' }}>
      <Paper>
        <AdminNavItem to="about" label="About Page" />
        <AdminNavItem to="socials" label="Socials" />
        <AdminNavItem to="tags" label="Tags" />
        <AdminNavItem to="posts" label="Posts" />
        <AdminNavItem to="metrics" label="Metrics" />
      </Paper>

      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Stack>
  )
}
