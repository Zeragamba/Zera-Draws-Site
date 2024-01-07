import { Box, Stack, SxProps, useMediaQuery, useTheme } from '@mui/material'
import classnames from 'classnames'
import { FC, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { Sidebar } from './Sidebar'

const styles = {
  Layout: {
    flexDirection: 'row',
    minHeight: '100%',
    width: '100%',
  },
  Sidebar: {
    flexShrink: 0,
    width: 260,

    '&.mobile': {
      width: 56,
      zIndex: 100,
    },
  },
  Main: {
    flexGrow: 1,
    overflowX: 'auto',
  },
  Overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'hsla(0deg, 0%, 0%, 15%)',
    position: 'absolute',
    top: 0,
    left: 0,
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
        <Box sx={{ padding: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Stack>
  )
}