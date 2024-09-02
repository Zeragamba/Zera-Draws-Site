import {
  faAngleRight,
  faBars,
  faChevronLeft,
  faDoorOpen,
  faGears,
  faPlus,
} from "@fortawesome/free-solid-svg-icons"
import {
  Box,
  Chip,
  Divider,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { grey } from "@mui/material/colors"
import classnames from "classnames"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"

import { NavItem } from "./NavItem"
import { SidebarGroup } from "./SidebarGroup"
import { SidebarTags } from "./SidebarTags"
import { SocialsGroup } from "./SocialsGroup"
import { useFeatureFlag, useIsAdmin } from "../../../Hooks"
import { FontAwesomeIcon } from "../../../Lib"
import { FeatureFlag } from "../../../Models"
import { useLogout$ } from "../../../Queries"

const styles = {
  backgroundColor: "hsla(0deg, 0%, 40%, 25%)",
  padding: 2,
  height: "100dvh",
  position: "fixed",
  top: 0,
  left: 0,
  color: "text.primary",
  maxWidth: 260,

  "&.isSmallScreen.open": {
    backgroundColor: "hsla(0deg, 0%, 10%, 95%)",
    width: 260,
  },
} satisfies SxProps

interface SidebarProps {
  open: boolean
  setOpen: (value: boolean) => void
}

export const Sidebar: FC<SidebarProps> = ({ open, setOpen }) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"))
  const [showTags, setShowTags] = useState<boolean>(false)

  const commissionsEnabled = useFeatureFlag(FeatureFlag.Commissions)
  const requestsEnabled = useFeatureFlag(FeatureFlag.Requests)
  const isAdmin = useIsAdmin()
  const logout$ = useLogout$()

  return (
    <Stack sx={styles} className={classnames({ open, isSmallScreen })}>
      {!open && (
        <>
          <Box
            onClick={() => setOpen(true)}
            sx={{
              padding: 2,
              borderRadius: 2,
              height: "100%",
              transition: "background-color 250ms",
              backgroundColor: "hsla(0deg, 0%, 100%, 0%)",
              "&:hover": {
                backgroundColor: "hsla(0deg, 0%, 100%, 15%)",
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
          {isSmallScreen && (
            <NavItem
              label="Hide Menu"
              onClick={() => setOpen(false)}
              adornments={{ left: <FontAwesomeIcon icon={faChevronLeft} /> }}
            />
          )}

          <SidebarGroup>
            <Typography variant={"h1"}>
              <Box
                component="a"
                href={"/"}
                onClick={(event) => {
                  event.preventDefault()
                  navigate("/")
                }}
                sx={{ color: "primary.light", textDecoration: "none" }}
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
                <NavItem label={"Featured"} to={"/featured"} />
                <NavItem label={"All"} to={"/all"} />
                <NavItem label={"Latest"} to={"/latest"} />
                <NavItem
                  label={"Tags"}
                  onClick={() => setShowTags(true)}
                  adornments={{
                    right: <FontAwesomeIcon icon={faAngleRight} />,
                  }}
                />

                {commissionsEnabled && (
                  <NavItem
                    label="Commissions"
                    adornments={{
                      right: (
                        <Chip
                          size="small"
                          label="Closed"
                          color="error"
                          variant="outlined"
                        />
                      ),
                    }}
                  />
                )}
                {requestsEnabled && (
                  <NavItem
                    label="Requests"
                    adornments={{
                      right: (
                        <Chip
                          size="small"
                          label="Closed"
                          color="error"
                          variant="outlined"
                        />
                      ),
                    }}
                  />
                )}
              </SidebarGroup>

              <Box sx={{ flexGrow: 1 }} />

              <Divider sx={{ borderColor: grey[500] }} />

              <SocialsGroup />
            </>
          )}
        </>
      )}
    </Stack>
  )
}
