import { FC } from 'react'

import { useTaggedPosts } from '../../Posts/PostsApi/GetTaggedPosts'
import { Glass } from '../../UI/Glass'
import { GalleryTitle } from '../GalleryTitle'
import { PostGallery } from '../PostGallery'

export const FeaturedGallery: FC = () => {
  const postsQuery = useTaggedPosts({ tag: 'featured' })

  if (postsQuery.isError) {
    return <Glass>Error loading gallery. :(</Glass>
  } else if (postsQuery.data) {
    const posts = postsQuery.data.pages[0]

    return (
      <Glass padding={0}>
        <GalleryTitle>Featured Posts</GalleryTitle>
        <PostGallery posts={posts} rowHeight={300} tagSlug="featured" />
      </Glass>
    )
  } else {
    return <Glass>Loading...</Glass>
  }
}
