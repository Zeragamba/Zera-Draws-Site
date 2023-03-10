import { FC } from 'react'

import { useTaggedPosts$ } from '../../Posts/PostsApi'
import { PostGallery } from '../PostGallery'

export const FeaturedPostsGallery: FC = () => {
  const postsQuery = useTaggedPosts$({ tag: 'featured' })
  return <PostGallery postsQuery={postsQuery} title="Featured" />
}
