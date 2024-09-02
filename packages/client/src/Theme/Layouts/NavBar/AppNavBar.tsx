import { Menu, Paper, Stack } from "@mui/material"
import { FC, useRef, useState } from "react"

import { NavBarLink } from "./NavBarLink"
import { TagsMenu } from "./TagsMenu"
import { useFeatureFlag, useIsMobile } from "../../../Hooks"
import { FeatureFlag, SocialPlatform } from "../../../Models"
import {
  useCurrentUser$,
  useLogout$,
  useSocialPlatforms$,
} from "../../../Queries"
import { SocialsNav } from "../SocalsNav"

export const AppNavBar: FC = () => {
  const isMobile = useIsMobile()

  return (
    <Paper sx={{ backgroundColor: "primary.main", width: "100%" }}>
      {isMobile ? (
        <Stack>
          <MobileNav />
        </Stack>
      ) : (
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            maxWidth: "1200px",
            flexGrow: 1,
            margin: "auto",
          }}
        >
          <Stack
            className="left"
            direction="row"
            style={{ alignItems: "center" }}
          >
            <LeftNavLinks />
          </Stack>

          <Stack
            className="right"
            direction="row"
            style={{ alignItems: "center" }}
          >
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
      <NavBarLink to="/first" label="First" />
      <NavBarLink to="/today" label="Today" />
      <NavBarLink to="/archive" label="Archive" />
      <TagsMenu />
    </>
  )
}

export const RightNavLinks: FC = () => {
  const { data: currentUser } = useCurrentUser$()
  const isAdmin = currentUser?.admin || false
  const logoutQuery = useLogout$()
  const socials$ = useSocialPlatforms$()
  const socials = socials$.data || {}

  const aboutPageEnabled = useFeatureFlag(FeatureFlag.AboutPage)

  return (
    <>
      {aboutPageEnabled && <NavBarLink to="/about" label="About" />}

      {isAdmin ? (
        <>
          <NavBarLink to="/post/new" label="Create Post" />
          <NavBarLink to="/admin" label="Admin" />
          <NavBarLink onClick={() => logoutQuery.mutate({})} label="Logout" />
        </>
      ) : (
        <>
          {socials[SocialPlatform.gumroad] && (
            <NavBarLink
              to={socials[SocialPlatform.gumroad]}
              label="Store"
              target="_blank"
            />
          )}
          <SocialsNav />
        </>
      )}
    </>
  )
}

const MobileNav: FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const anchorEl = useRef<HTMLAnchorElement | null>(null)

  return (
    <>
      <NavBarLink
        onClick={() => setMenuOpen(true)}
        buttonRef={anchorEl}
        label="Menu"
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl.current}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          sx: {
            backgroundColor: "primary.main",
            width: "100%",
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
