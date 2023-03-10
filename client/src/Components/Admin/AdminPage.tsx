import { Box, Paper, Stack } from '@mui/material'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { AdminNavItem } from './AdminNavItem'
import { AdminLayout } from '../Layouts'

export const AdminPage: FC = () => {
  return (
    <AdminLayout>
      <Stack gap={2} direction={'row'} sx={{ flexGrow: 1, height: '100%' }}>
        <Paper>
          <AdminNavItem to="about" label="About Page" />
          <AdminNavItem to="socials" label="Socials" />
          <AdminNavItem to="tags" label="Tags" />
          <AdminNavItem to="posts" label="Posts" />
        </Paper>

        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Outlet />
        </Box>
      </Stack>
    </AdminLayout>
  )
}
