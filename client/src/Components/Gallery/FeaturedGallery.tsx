import { FC } from 'react'

import { useGalleryPosts } from '../../Lib/ServerApi'
import { Glass } from '../UI/Glass'
import { Gallery, GallerySizes } from './Gallery'

export const FeaturedGallery: FC = () => {
  const postsQuery = useGalleryPosts({ gallery: 'featured' })

  if (postsQuery.isError) {
    return <Glass>Error loading gallery. :(</Glass>
  } else if (postsQuery.data) {
    const Posts = postsQuery.data.pages.flat()
    return <Gallery title="Featured" posts={Posts} gallerySize={GallerySizes.LARGE} />
  } else {
    return <Glass>Loading...</Glass>
  }
}
