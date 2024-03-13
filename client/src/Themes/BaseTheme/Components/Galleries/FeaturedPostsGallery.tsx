import { FC } from 'react'

import { PostGallery } from './PostGallery'
import { useTaggedPosts$ } from '../../../../Lib'

export const FeaturedPostsGallery: FC = () => {
  const posts$ = useTaggedPosts$({ tagId: 'featured' })
  return <PostGallery postsQuery={posts$} title="Featured" />
}
