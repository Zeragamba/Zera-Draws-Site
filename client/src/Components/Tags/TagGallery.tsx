import React, { FC, ReactNode } from 'react'

import { GalleryTitle } from '../Gallery/GalleryTitle'
import { PostGallery } from '../Gallery/PostGallery'
import { useTaggedPosts } from '../Posts/PostsApi'
import { Glass } from '../UI/Glass'
import { useTag } from './TagsApi'

interface TagGalleryDisplayProps {
  tagId: string
}

export const TagGallery: FC<TagGalleryDisplayProps> = ({
  tagId,
}) => {
  const tagQuery = useTag({ tag: tagId })
  const postsQuery = useTaggedPosts({ tag: tagId })

  let content: ReactNode

  if (postsQuery.isError) {
    content = <Glass>Error loading gallery. :(</Glass>
  } else if (postsQuery.isLoading) {
    content = <Glass>Loading...</Glass>
  } else {
    const posts = postsQuery.data.pages[0]
    content = (
      <Glass>
        <PostGallery posts={posts} rowHeight={300} tagSlug="featured" />
      </Glass>
    )
  }

  return (
    <>
      <Glass padding={0}>
        <GalleryTitle>Tag: {tagQuery.data?.name || '...'}</GalleryTitle>
      </Glass>

      {content}
    </>
  )
}
