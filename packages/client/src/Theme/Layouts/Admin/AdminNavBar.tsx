import { Divider, Paper, Stack } from "@mui/material"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { useLogout$ } from "../../../Lib"
import { NavBarLink } from "../NavBar"

export const AdminNavBar: FC = () => {
  return (
    <Paper sx={{ backgroundColor: "primary.main", width: "100%" }}>
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
    </Paper>
  )
}

export const LeftNavLinks: FC = () => {
  return (
    <>
      <NavBarLink to="/" label="Exit" />

      <Divider orientation="vertical" />

      <NavBarLink to="post/new" label="Create Post" />

      <Divider orientation="vertical" />

      <NavBarLink to="posts" label="Posts" />
      <NavBarLink to="tags" label="Tags" />
      <NavBarLink to="metrics" label="Metrics" />
    </>
  )
}

export const RightNavLinks: FC = () => {
  const navigate = useNavigate()
  const logoutQuery = useLogout$()

  const onLogout = async () => {
    navigate("/")
    logoutQuery.mutate({})
  }

  return (
    <>
      <NavBarLink to="socials" label="Socials" />
      <NavBarLink to="about" label="About Page" />

      <Divider orientation="vertical" />

      <NavBarLink to="account" label="Account" />
      <NavBarLink onClick={onLogout} label="Logout" />
    </>
  )
}
