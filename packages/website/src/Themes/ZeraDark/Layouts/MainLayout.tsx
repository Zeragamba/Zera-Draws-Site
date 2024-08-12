import { Box, SxProps, useMediaQuery, useTheme } from '@mui/material'
import classnames from 'classnames'
import { FC, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { Sidebar } from '../Components'

const styles = {
  Layout: {
    minHeight: '100vh',
    maxWidth: '100vw',
    display: 'flex',

    '.Main': {
      minWidth: 0,
      flexShrink: 1,
      flexGrow: 1,
    },

    '.Sidebar': {
      width: '260px',
      flexShrink: 0,
      zIndex: 100,
    },

    '&.isSmallScreen': {
      '.Sidebar': {
        width: '56px',
      },
    },
  },

  Overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'hsla(0deg, 0%, 0%, 25%)',
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
    <Box className={classnames('Layout', { isSmallScreen })} sx={styles.Layout}>
      {isSmallScreen && sidebarOpen && (
        <Box className={'Overlay'} onClick={() => setSidebarOpen(false)} />
      )}

      <Box className={'Sidebar'}>
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      </Box>

      <Box className={'Main'} sx={{ padding: isSmallScreen ? 2 : 4 }}>
        {isSmallScreen && sidebarOpen && (
          <Box sx={styles.Overlay} onClick={() => setSidebarOpen(false)} />
        )}

        <Outlet />
      </Box>
    </Box>
  )
}
