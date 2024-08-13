import { faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { Stack } from "@mui/material"
import { parseISO } from "date-fns"
import { FC } from "react"

import { ScheduledChip } from "./ScheduledChip"
import { ViewCounter } from "./ViewCounter"
import { useIsAdmin } from "../../../../Hooks"
import { FontAwesomeIcon } from "../../../../Lib"
import { PostData } from "../../../../Models"
import { TagChip, TagList } from "../Tags"

interface PostTagsProps {
  post: PostData
}

export const PostTags: FC<PostTagsProps> = ({ post }) => {
  const isAdmin = useIsAdmin()

  return (
    <Stack direction="row" gap={1} flexWrap="wrap">
      {isAdmin && <ViewCounter postId={post.id} />}

      {!post.released && (
        <TagChip icon={<FontAwesomeIcon icon={faEyeSlash} />} label="Private" />
      )}

      {post.scheduled && <ScheduledChip date={parseISO(post.scheduled)} />}

      <TagList tags={post.tags} />
    </Stack>
  )
}
