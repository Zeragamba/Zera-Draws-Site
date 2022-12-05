import { FC } from 'react'

import { useGalleryPosts } from '../../Posts/PostsApi'
import { Glass } from '../../UI/Glass'
import { GalleryTitle } from '../GalleryTitle'
import { PostGallery } from '../PostGallery'

export const FeaturedGallery: FC = () => {
  const postsQuery = useGalleryPosts({ gallery: 'featured' })

  if (postsQuery.isError) {
    return <Glass>Error loading gallery. :(</Glass>
  } else if (postsQuery.data) {
    const posts = postsQuery.data.pages[0]

    return (
      <Glass>
        <GalleryTitle>Featured Posts</GalleryTitle>
        <PostGallery posts={posts} rowHeight={300} />
      </Glass>
    )
  } else {
    return <Glass>Loading...</Glass>
  }
}
