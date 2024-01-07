import { Box, Stack, SxProps, useMediaQuery, useTheme } from '@mui/material'
import classnames from 'classnames'
import { FC, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { Sidebar } from './Sidebar'

const styles = {
  Layout: {
    flexDirection: 'row',
    height: '100vh',
    width: '100vw',
  },
  Sidebar: {
    '&.mobile': {
      width: 56,
      zIndex: 100,
    },
  },
  Main: {
    flexGrow: 1,
    overflowX: 'auto',
    padding: 4,
    paddingLeft: 4,
  },
  Overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'hsla(0deg, 0%, 0%, 15%)',
    position: 'absolute',
    zIndex: 90,
  },
} satisfies Record<string, SxProps>

interface MainLayoutProps {

}

export const MainLayout: FC<MainLayoutProps> = () => {
  const location = useLocation()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [ sidebarOpen, setSidebarOpen ] = useState<boolean>(isSmallScreen)

  useEffect(() => {
    if (!isSmallScreen) return
    setSidebarOpen(false)
  }, [ location, isSmallScreen ])

  useEffect(() => {
    if (!isSmallScreen && !sidebarOpen) return setSidebarOpen(true)
    if (isSmallScreen && sidebarOpen) return setSidebarOpen(false)
  }, [ isSmallScreen ])

  return (
    <Stack sx={styles.Layout}>
      <Box sx={styles.Sidebar} className={classnames({ mobile: isSmallScreen })}>
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      </Box>
      <Box sx={styles.Main}>
        {isSmallScreen && sidebarOpen && (
          <Box sx={styles.Overlay} onClick={() => setSidebarOpen(false)} />
        )}
        <Outlet />
      </Box>
    </Stack>
  )
}