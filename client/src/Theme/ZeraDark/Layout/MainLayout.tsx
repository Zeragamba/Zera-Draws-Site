import { Box, Stack, SxProps } from '@mui/material'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { Sidebar } from './Sidebar/Sidebar'

const styles = {
  Layout: {
    flexDirection: 'row',
    gap: 2,
    height: '100vh',
    width: '100vw',
  },
  Sidebar: {
    backgroundColor: 'hsla(0deg, 0%, 40%, 25%)',
  },
  Main: {
    flexGrow: 1,
    overflowX: 'auto',
    padding: 2,
    paddingLeft: 0,
  },
} satisfies Record<string, SxProps>

interface MainLayoutProps {

}

export const MainLayout: FC<MainLayoutProps> = () => {
  return (
    <Stack sx={styles.Layout}>
      <Box sx={styles.Sidebar}>
        <Sidebar />
      </Box>
      <Box sx={styles.Main}>
        <Outlet />
      </Box>
    </Stack>
  )
}