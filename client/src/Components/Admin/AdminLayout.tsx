import { Box, Paper, Stack } from '@mui/material'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { AdminNavItem } from './AdminNavItem'
import { Layout, PublicLayout } from '../Layouts'
import { AuthorizingPage } from '../User/Login/AuthenticatingPage'
import { LoginPage } from '../User/Login/LoginPage'
import { useCurrentUser } from '../User/UsersApi'


export const AdminLayout: Layout = ({ children }) => {
  const userQuery = useCurrentUser()

  if (userQuery.isFetching) return <AuthorizingPage />
  if (!userQuery.data) return <LoginPage />
  if (!userQuery.data.admin) return <Navigate to={'/'} />

  return (
    <PublicLayout>
      <Stack gap={2} direction={'row'} sx={{ flexGrow: 1, height: '100%' }}>
        <Paper>
          <Box sx={{ position: 'sticky', top: 115 }}>
            <AdminNavItem to="about" label="About Page" />
            <AdminNavItem to="socials" label="Socials" />
            <AdminNavItem to="tags" label="Tags" />
            <AdminNavItem to="posts" label="Posts" />
            <AdminNavItem to="metrics" label="Metrics" />
          </Box>
        </Paper>

        <Box sx={{ flexGrow: 1 }}>
          {children}
          <Outlet />
        </Box>
      </Stack>
    </PublicLayout>
  )
}
