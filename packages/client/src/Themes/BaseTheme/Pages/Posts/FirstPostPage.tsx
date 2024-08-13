import { FC } from "react"
import { Navigate } from "react-router-dom"

import { ArchivePage } from "./ArchivePage"
import { useFirstPost$ } from "../../../../Queries"
import { LoadingPage } from "../LoadingPage"

export const FirstPostPage: FC = () => {
  const firstPost$ = useFirstPost$()

  if (firstPost$.isPending) return <LoadingPage />
  if (firstPost$.isError) return <ArchivePage />

  const firstPost = firstPost$.data
  return <Navigate to={`/post/${firstPost.slug}`} />
}
