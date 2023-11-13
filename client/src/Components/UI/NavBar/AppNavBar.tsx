import { Menu, Paper, Stack } from '@mui/material'
import React, { FC, useRef, useState } from 'react'

import { NavBarLink } from './NavBarLink'
import { TagsMenu } from './TagsMenu'
import { useFeatureFlags } from '../../SiteMeta/UseSiteMeta'
import { SocialsNav } from '../../Socials/SocalsNav'
import { useCurrentUser, useLogout } from '../../User/UsersApi'
import { useIsMobile } from '../ScreenSize'

export const AppNavBar: FC = () => {
  const isMobile = useIsMobile()

  return (
    <Paper sx={{ backgroundColor: 'primary.main', width: '100%', borderRadius: 0 }}>
      {isMobile ? (
        <Stack>
          <MobileNav />
        </Stack>
      ) : (
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', maxWidth: '1200px', flexGrow: 1, margin: 'auto' }}
        >
          <Stack className="left" direction="row" style={{ alignItems: 'center' }}>
            <LeftNavLinks />
          </Stack>

          <Stack className="right" direction="row" style={{ alignItems: 'center' }}>
            <RightNavLinks />
          </Stack>
        </Stack>
      )}
    </Paper>
  )
}


export const LeftNavLinks: FC = () => {
  return (
    <>
      <NavBarLink label="Home" to="/" />
      <NavBarLink label="Latest" to="/latest" />
      <NavBarLink label="Archive" to="/archive" />
      <TagsMenu />
    </>
  )
}

export const RightNavLinks: FC = () => {
  const { data: currentUser } = useCurrentUser()
  const isAdmin = currentUser?.admin || false
  const logoutQuery = useLogout()
  const featureFlags = useFeatureFlags()

  return (
    <>
      {featureFlags.AboutPage === 'true' && (
        <NavBarLink to="/about" label="About" />
      )}

      {isAdmin ? (
        <>
          <NavBarLink to="/post/new" label="Create Post" />
          <NavBarLink to="/admin" label="Admin" />
          <NavBarLink onClick={() => logoutQuery.mutate({})} label="Logout" />
        </>
      ) : (
        <>
          <SocialsNav />
        </>
      )}
    </>
  )
}
const MobileNav: FC = () => {
  const [ menuOpen, setMenuOpen ] = useState<boolean>(false)

  const anchorEl = useRef<HTMLAnchorElement | null>(null)

  return (
    <>
      <NavBarLink onClick={() => setMenuOpen(true)} buttonRef={anchorEl} label="Menu" />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl.current}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            backgroundColor: 'primary.main',
            width: '100%',
          },
        }}
      >
        <Stack>
          <LeftNavLinks />
          <RightNavLinks />
        </Stack>
      </Menu>
    </>
  )
}
