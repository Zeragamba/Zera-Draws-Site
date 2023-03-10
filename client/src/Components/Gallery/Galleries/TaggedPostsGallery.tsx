import React, { FC } from 'react'

import { useTaggedPosts$ } from '../../Posts/PostsApi'
import { useTag } from '../../Tags/TagsApi'
import { PostGallery } from '../PostGallery'

interface TagGalleryDisplayProps {
  tagId: string
}

export const TaggedPostsGallery: FC<TagGalleryDisplayProps> = ({
  tagId,
}) => {
  const { data: tag } = useTag({ tag: tagId })
  const posts$ = useTaggedPosts$({ tag: tagId })
  return <PostGallery postsQuery={posts$} title={tag?.name || '...'} tagSlug={tag?.slug} />
}
