import { Box } from "@mui/material"
import { FC } from "react"
import { Navigate, Outlet } from "react-router-dom"

import { useCurrentUser$, useIsAdmin } from "../../../Lib"
import { AuthorizingPage, LoginPage } from "../../Pages"
import { AdminHeader } from "./AdminHeader"

export const AdminLayout: FC = () => {
  const user$ = useCurrentUser$()
  const isAdmin = useIsAdmin()

  if (user$.isFetching) return <AuthorizingPage />
  if (!user$.data) return <LoginPage />
  if (!isAdmin) return <Navigate to={"/"} />

  return (
    <Box>
      <AdminHeader />

      <Box padding={2}>
        <Outlet />
      </Box>
    </Box>
  )
}
