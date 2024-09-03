import { Box, useTheme } from "@mui/material"
import { MuiMarkdown } from "mui-markdown"
import { FC } from "react"

interface MarkdownViewerProps {
  children: string | null | undefined
}

export const MarkdownViewer: FC<MarkdownViewerProps> = ({ children }) => {
  const theme = useTheme()

  return (
    <Box sx={theme.typography.body1}>
      <MuiMarkdown>{children}</MuiMarkdown>
    </Box>
  )
}
