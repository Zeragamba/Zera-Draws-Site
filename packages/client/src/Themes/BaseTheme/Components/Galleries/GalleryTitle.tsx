import { Typography } from "@mui/material"
import { FC, ReactNode } from "react"

interface GalleryTitleProps {
  linkTo?: string
  children: ReactNode
}

export const GalleryTitle: FC<GalleryTitleProps> = ({ children }) => {
  return (
    <Typography variant="h2" sx={{ padding: 2 }}>
      {children}
    </Typography>
  )
}
