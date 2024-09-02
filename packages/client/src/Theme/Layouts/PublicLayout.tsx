import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"

import { Header } from "./Header"
import { Layout, LayoutStyles } from "./Layout"
import { useAgeGate } from "../../Lib"
import { AgeGatePage } from "../Pages"

interface PublicLayoutProps {
  copyright?: string
  thinHeader?: boolean
  disableAgeGate?: boolean
}

export const PublicLayout: Layout<PublicLayoutProps> = ({
  copyright,
  disableAgeGate = true,
}) => {
  const { verified: ageVerified } = useAgeGate()
  if (!disableAgeGate && !ageVerified) return <AgeGatePage />

  return (
    <Box sx={LayoutStyles.layout}>
      <Box sx={LayoutStyles.header}>
        <Header />
      </Box>

      <Box component="main" sx={LayoutStyles.main}>
        <Box sx={LayoutStyles.content}>
          <Outlet />
        </Box>

        <Box sx={{ textAlign: "center", padding: 2 }}>
          &copy; {copyright} {new Date().getFullYear()}
        </Box>
      </Box>
    </Box>
  )
}
