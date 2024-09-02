import { faEye } from "@fortawesome/free-regular-svg-icons"
import { FC } from "react"

import { FontAwesomeIcon, usePostViews$ } from "../../../Lib"
import { PostData } from "../../../Models"
import { TagChip } from "../Tags"

interface ViewCounterProps {
  postId: PostData["id"]
}

export const ViewCounter: FC<ViewCounterProps> = ({ postId }) => {
  const views$ = usePostViews$(postId)

  if (views$.isPending || views$.isError) return null
  const { total, unique } = views$.data

  return (
    <TagChip
      color={"default"}
      icon={<FontAwesomeIcon icon={faEye} />}
      label={`${total} Total | ${unique} Unique`}
    />
  )
}
