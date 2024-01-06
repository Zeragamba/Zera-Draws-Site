import { faAngleRight, faBars, faChevronLeft, faDoorOpen, faGears, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Box, Chip, Divider, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { NavItem } from './NavItem'
import { SidebarGroup } from './SidebarGroup'
import { SidebarTags } from './SidebarTags'
import { SocialsGroup } from './SocialsGroup'
import { FeatureFlag } from '../../../../Components/SiteMeta/SiteMetaData'
import { useFeatureFlag } from '../../../../Components/SiteMeta/UseSiteMeta'
import { useIsAdmin, useLogout } from '../../../../Components/User/UsersApi'
import { FontAwesomeIcon } from '../../../../Lib/Icons/FontAwesomeIcon'

interface SidebarProps {
}

export const Sidebar: FC<SidebarProps> = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [ open, setOpen ] = useState<boolean>(isSmallScreen)
  const [ showTags, setShowTags ] = useState<boolean>(false)

  const commissionsEnabled = useFeatureFlag(FeatureFlag.Commissions)
  const requestsEnabled = useFeatureFlag(FeatureFlag.Requests)
  const isAdmin = useIsAdmin()
  const logout$ = useLogout()

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
            <Typography variant={'h1'}>
              <Box
                component="a"
                href={'/'}
                onClick={(event) => {
                  event.preventDefault()
                  navigate('/')
                }}
                sx={{ color: 'primary.light', textDecoration: 'none' }}
              >
                Zeragamba
              </Box>
            </Typography>
          </SidebarGroup>

          {isAdmin && (
            <>
              <Divider sx={{ borderColor: grey[500] }} />
              <SidebarGroup>
                <NavItem
                  label="Create Post"
                  to="/post/new"
                  adornments={{ right: <FontAwesomeIcon icon={faPlus} /> }}
                />
                <NavItem
                  label="Admin"
                  to="/admin"
                  adornments={{ right: <FontAwesomeIcon icon={faGears} /> }}
                />
                <NavItem
                  label="Logout"
                  onClick={() => logout$.mutate({})}
                  adornments={{ right: <FontAwesomeIcon icon={faDoorOpen} /> }}
                />
              </SidebarGroup>
            </>
          )}

          <Divider sx={{ borderColor: grey[500] }} />

          {showTags ? (
            <SidebarTags onBack={() => setShowTags(false)} />
          ) : (
            <>
              <SidebarGroup>
                <NavItem
                  label={'All'}
                  to={'/'}
                />
                <NavItem
                  label={'Featured'}
                  to={'/tag/featured'}
                />
                <NavItem
                  label={'Latest'}
                  to={'/latest'}
                />
                <NavItem
                  label={'Tags'}
                  onClick={() => setShowTags(true)}
                  adornments={{ right: <FontAwesomeIcon icon={faAngleRight} /> }}
                />
              </SidebarGroup>

              <Divider sx={{ borderColor: grey[500] }} />

              <SidebarGroup>
                {commissionsEnabled && (
                  <NavItem
                    label="Commissions"
                    adornments={{ right: <Chip size="small" label="Closed" color="error" variant="outlined" /> }}
                  />
                )}
                {requestsEnabled && (
                  <NavItem
                    label="Requests"
                    adornments={{ right: <Chip size="small" label="Closed" color="error" variant="outlined" /> }}
                  />
                )}
              </SidebarGroup>
            </>
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Divider sx={{ borderColor: grey[500] }} />

          <SocialsGroup />
        </>
      )}
    </Stack>


  )
}