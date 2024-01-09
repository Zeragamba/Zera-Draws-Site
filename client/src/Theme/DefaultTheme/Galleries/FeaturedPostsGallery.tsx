import { FC } from 'react'

import { PostGallery } from './PostGallery'
import { useTaggedPosts$ } from '../../../Lib'

export const FeaturedPostsGallery: FC = () => {
  const postsQuery = useTaggedPosts$({ tag: 'featured' })
  return <PostGallery postsQuery={postsQuery} title="Featured" />
}
