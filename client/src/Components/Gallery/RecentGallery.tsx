import { FC } from 'react'

import { useRecentPosts } from '../../Lib/ServerApi'
import { Glass } from '../UI/Glass'
import { Gallery, GallerySizes } from './Gallery'


interface RecentGalleryProps {
  numImages?: number
}

export const RecentGallery: FC<RecentGalleryProps> = ({
  numImages = 5,
}) => {
  const postsQuery = useRecentPosts({ numImages })

  if (postsQuery.isError) {
    return <Glass>Error loading gallery. :(</Glass>
  } else if (postsQuery.data) {
    return <Gallery title="Recent" posts={postsQuery.data} gallerySize={GallerySizes.SMALL} />
  } else {
    return <Glass>Loading...</Glass>
  }
}
