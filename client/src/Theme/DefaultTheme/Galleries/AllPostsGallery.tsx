import { FC } from 'react'

import { PostGallery } from './PostGallery'
import { useAllPosts$ } from '../../../Lib'

export const AllPostsGallery: FC = () => {
  const postsQuery = useAllPosts$()
  return <PostGallery postsQuery={postsQuery} />
}
