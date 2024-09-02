import { FC } from "react"

import { DefaultViewPostPage } from "../../../Theme"
import { ViewPost } from "../Components"

export const ViewPostPage: FC = () => (
  <DefaultViewPostPage
    slots={{
      ViewPost,
    }}
  />
)
