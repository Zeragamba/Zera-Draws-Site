import { FC } from "react"

import { LatestPostProvider } from "../../../../Contexts"
import { ViewPost } from "../../Components"
import { LoadingPage } from "../LoadingPage"

export const LatestPostPage: FC = () => {
  return (
    <LatestPostProvider renderPending={<LoadingPage />}>
      <ViewPost />
    </LatestPostProvider>
  )
}
