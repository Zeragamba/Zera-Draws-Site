import { Paper } from "@mui/material"
import { FC } from "react"
import { useCustomContent$ } from "../../Lib"
import { MarkdownViewer } from "../Components"
import { ErrorPage } from "./ErrorPage"
import { LoadingPage } from "./LoadingPage"

export const AboutPage: FC = () => {
  const customContent$ = useCustomContent$()

  if (customContent$.isPending) return <LoadingPage />
  if (customContent$.isError)
    return <ErrorPage error={String(customContent$.error)} />
  const contentMeta = customContent$.data

  return (
    <Paper sx={{ padding: 2 }}>
      <MarkdownViewer>{contentMeta.about}</MarkdownViewer>
    </Paper>
  )
}
