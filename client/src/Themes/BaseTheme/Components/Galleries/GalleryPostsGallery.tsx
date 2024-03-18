import { FC } from 'react'

import { PostGallery } from './PostGallery'
import { useGallery$, useGalleryPosts$ } from '../../../../Queries'

interface GalleryDisplayProps {
  galleryId: string
}

export const GalleryPostsGallery: FC<GalleryDisplayProps> = ({
  galleryId,
}) => {
  const { data: gallery } = useGallery$({ galleryId: galleryId })
  const postsQuery = useGalleryPosts$({ galleryId: galleryId })
  return <PostGallery postsQuery={postsQuery} title={gallery?.name || '...'} />
}
