import { FC } from "react"

import { DefaultViewPostPage } from "../../BaseTheme"
import { ViewPost } from "../Components"

export const ViewPostPage: FC = () => (
  <DefaultViewPostPage
    slots={{
      ViewPost,
    }}
  />
)
