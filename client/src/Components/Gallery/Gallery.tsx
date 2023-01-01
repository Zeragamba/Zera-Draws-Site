import { FC, ReactNode } from 'react'

import { useGalleryPosts } from '../Posts/PostsApi'
import { Glass } from '../UI/Glass'
import { GalleryTitle } from './GalleryTitle'
import { PostGallery } from './PostGallery'

interface GalleryDisplayProps {
  galleryId: string
}

export const Gallery: FC<GalleryDisplayProps> = ({
  galleryId,
}) => {
  const postsQuery = useGalleryPosts({ gallery: galleryId })

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
        <GalleryTitle>Featured Posts</GalleryTitle>
      </Glass>

      {content}
    </>
  )
}
