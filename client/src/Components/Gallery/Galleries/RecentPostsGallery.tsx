import { FC } from 'react'

import { useRecentPosts } from '../../../Lib/ServerApi'
import { Glass } from '../../UI/Glass'
import { GalleryTitle } from '../GalleryTitle'
import { PostGallery } from '../PostGallery'


interface RecentGalleryProps {
  numImages?: number
}

export const RecentPostsGallery: FC<RecentGalleryProps> = ({
  numImages = 5,
}) => {
  const postsQuery = useRecentPosts({ numImages })

  if (postsQuery.isError) {
    return <Glass>Error loading gallery. :(</Glass>
  } else if (postsQuery.data) {
    const posts = postsQuery.data

    return (
      <Glass>
        <GalleryTitle>Recent Posts</GalleryTitle>
        <PostGallery posts={posts} />
      </Glass>
    )
  } else {
    return <Glass>Loading...</Glass>
  }
}
