import { FC } from 'react'

import { useAllPosts$ } from '../../Posts/PostsApi'
import { PostGallery } from '../PostGallery'

export const AllPostsGallery: FC = () => {
  const postsQuery = useAllPosts$()
  return <PostGallery postsQuery={postsQuery} />
}
