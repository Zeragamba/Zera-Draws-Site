import React, { FC } from 'react'

import { PostGallery } from './PostGallery'
import { useTag$, useTaggedPosts$ } from '../../../../Lib'

interface TagGalleryDisplayProps {
  tagId: string
}

export const TaggedPostsGallery: FC<TagGalleryDisplayProps> = ({
  tagId,
}) => {
  const { data: tag } = useTag$({ tagId })
  const posts$ = useTaggedPosts$({ tagId })
  return <PostGallery postsQuery={posts$} title={tag?.name || '...'} tagSlug={tag?.slug} />
}
