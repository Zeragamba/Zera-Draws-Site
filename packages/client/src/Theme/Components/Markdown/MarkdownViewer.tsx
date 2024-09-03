import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import { getOverrides, MuiMarkdown } from "mui-markdown"
import { FC, HTMLProps, MouseEventHandler } from "react"
import { useNavigate } from "react-router-dom"
import { useMarkdownStyles } from "./MarkdownStyles"

interface MarkdownViewerProps {
  children: string | null | undefined
}

export const MarkdownViewer: FC<MarkdownViewerProps> = ({ children }) => {
  const markdownStyles = useMarkdownStyles()

  return (
    <Box sx={markdownStyles} className={"markdown"}>
      <MuiMarkdown
        overrides={{
          ...getOverrides({}),
          a: { component: MarkdownLink },
        }}
        children={children}
      />
    </Box>
  )
}

export const MarkdownLink: FC<HTMLProps<HTMLAnchorElement>> = ({
  href = "/",
  children,
}) => {
  const navigate = useNavigate()
  const isExternal = !href.startsWith("/")

  const onClick: MouseEventHandler = (event) => {
    if (isExternal) return
    event.preventDefault()
    navigate(href)
  }

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      onClick={onClick}
      children={children}
    />
  )
}
