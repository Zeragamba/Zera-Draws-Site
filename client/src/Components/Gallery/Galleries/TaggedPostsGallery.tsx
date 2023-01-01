import React, { FC } from 'react'

import { useTaggedPosts } from '../../Posts/PostsApi'
import { useTag } from '../../Tags/TagsApi'
import { PostGallery } from '../PostGallery'

interface TagGalleryDisplayProps {
  tagId: string
}

export const TaggedPostsGallery: FC<TagGalleryDisplayProps> = ({
  tagId,
}) => {
  const { data: tag } = useTag({ tag: tagId })
  const postsQuery = useTaggedPosts({ tag: tagId })
  return <PostGallery postsQuery={postsQuery} title={tag?.name || '...'} />
}
