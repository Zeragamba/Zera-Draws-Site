import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Stack } from '@mui/material'
import { parseISO } from 'date-fns'
import React, { FC } from 'react'

import { PostData } from './PostData'
import { ScheduledChip } from './ViewPost/ScheduledChip'
import { TagChip } from '../Tags/TagChip'
import { TagList } from '../Tags/TagList'

interface PostTagsProps {
  post: PostData
}

export const PostTags: FC<PostTagsProps> = ({
  post,
}) => {
  return (
    <Stack direction="row" gap={1} flexWrap="wrap">
      {!post.released && (
        <TagChip icon={<FontAwesomeIcon icon={faEyeSlash} />} label="Private" />
      )}

      {post.scheduled && (
        <ScheduledChip date={parseISO(post.scheduled)} />
      )}

      <TagList tags={post.tags} />
    </Stack>
  )
}
