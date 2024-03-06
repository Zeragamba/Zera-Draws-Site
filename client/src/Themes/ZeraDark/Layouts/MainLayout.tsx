import { Box, SxProps, useMediaQuery, useTheme } from '@mui/material'
import classnames from 'classnames'
import { FC, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { Sidebar } from '../Components/Sidebar'

const styles = {
  '.Sidebar': {
    position: 'fixed',
    top: 0,
    left: 0,
    width: 260,
    zIndex: 100,
  },
  '.Main': {
    paddingLeft: '260px',
  },
  '.Overlay': {
    width: '100%',
    height: '100%',
    backgroundColor: 'hsla(0deg, 0%, 0%, 15%)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 90,
  },

  '&.mobile': {
    '.Main': { paddingLeft: '56px' },
    '.Sidebar': { width: '56px' },
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
    <Box className={classnames({ Layout: true, mobile: isSmallScreen })} sx={styles}>
      <Box className={classnames('Sidebar', { mobile: isSmallScreen })}>
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      </Box>
      <Box className={'Main'}>
        {isSmallScreen && sidebarOpen && (
          <Box className={'Overlay'} onClick={() => setSidebarOpen(false)} />
        )}

        <Box sx={{ padding: isSmallScreen ? 2 : 4 }}>
          {isSmallScreen && sidebarOpen && (
            <Box sx={styles.Overlay} onClick={() => setSidebarOpen(false)} />
          )}
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
