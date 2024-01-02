import { faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Box, Divider, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { grey } from '@mui/material/colors'
import { FC, useEffect, useState } from 'react'

import { NavItem } from './NavItem'
import { SidebarGroup } from './SidebarGroup'
import { SocialsGroup } from './SocialsGroup'
import { FontAwesomeIcon } from '../../../../Lib/Icons/FontAwesomeIcon'

interface SidebarProps {
}

export const Sidebar: FC<SidebarProps> = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [ open, setOpen ] = useState<boolean>(isSmallScreen)

  useEffect(() => {
    if (!isSmallScreen && !open) return setOpen(true)
    if (isSmallScreen && open) return setOpen(false)
  }, [ isSmallScreen ])

  return (
    <Stack sx={{ padding: 2, height: '100%', color: grey[50], zIndex: 100 }}>
      {!open && (
        <>
          <Box
            onClick={() => setOpen(!open)}
            sx={{
              padding: 2,
              borderRadius: 2,
              height: open ? 'auto' : '100%',
              transition: 'background-color 250ms',
              backgroundColor: 'hsla(0deg, 0%, 100%, 0%)',
              '&:hover': {
                backgroundColor: 'hsla(0deg, 0%, 100%, 15%)',
              },
            }}
          >
            <FontAwesomeIcon icon={open ? faChevronLeft : faBars} />
          </Box>

          <SocialsGroup iconsOnly />
        </>
      )}

      {open && (
        <>
          <SidebarGroup>
            <Box sx={{ color: 'primary.light' }}>
              <Typography variant={'h1'}>Zeragamba</Typography>
            </Box>

            <Box>
              <Typography>[Search Box]</Typography>
            </Box>
          </SidebarGroup>

          <Divider sx={{ borderColor: grey[500] }} />

          <SidebarGroup>
            <NavItem label={'Featured'} to={'/featured'} />
            <NavItem label={'All'} to={'/'} />
            <NavItem label={'Latest'} to={'/latest'} />
            <NavItem label={'Tags'} to={'/'} />
          </SidebarGroup>

          <Divider sx={{ borderColor: grey[500] }} />

          <SidebarGroup>
            <NavItem label="Commissions (Closed)" to={'/'} />
            <NavItem label="Requests (Closed)" to={'/'} />
          </SidebarGroup>

          <Box sx={{ flexGrow: 1 }} />

          <Divider sx={{ borderColor: grey[500] }} />

          <SocialsGroup />
        </>
      )}
    </Stack>


  )
}