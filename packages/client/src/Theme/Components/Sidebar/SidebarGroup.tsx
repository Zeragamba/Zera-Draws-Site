import { Stack } from "@mui/material"
import { FC, PropsWithChildren } from "react"

export const SidebarGroup: FC<PropsWithChildren> = ({ children }) => (
  <Stack sx={{ paddingTop: 2, paddingBottom: 2 }}>{children}</Stack>
)
