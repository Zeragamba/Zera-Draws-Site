import { FC } from 'react'

import { useGalleryPosts } from '../../Posts/PostsApi'
import { useGallery } from '../GalleryApi/GetGallery'
import { PostGallery } from '../PostGallery'

interface GalleryDisplayProps {
  galleryId: string
}

export const GalleryPostsGallery: FC<GalleryDisplayProps> = ({
  galleryId,
}) => {
  const { data: gallery } = useGallery({ galleryId: galleryId })
  const postsQuery = useGalleryPosts({ gallery: galleryId })
  return <PostGallery postsQuery={postsQuery} title={gallery?.name || '...'} />
}
