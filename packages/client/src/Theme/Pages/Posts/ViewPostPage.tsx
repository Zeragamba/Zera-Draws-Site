import { FC } from "react"

import { ParamsPostProvider } from "../../../Lib"
import { ViewPost } from "../../Components"
import { LoadingPage } from "../LoadingPage"

export const ViewPostPage: FC = () => {
  return (
    <ParamsPostProvider renderPending={<LoadingPage />}>
      <ViewPost />
    </ParamsPostProvider>
  )
}
