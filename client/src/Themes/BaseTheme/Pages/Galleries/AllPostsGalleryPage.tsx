import { FC } from 'react'

import { useAllPosts$ } from '../../../../Queries'
import { PostGallery } from '../../Components'

export const AllPostsGalleryPage: FC = () => {
  const postsQuery = useAllPosts$()
  return <PostGallery postsQuery={postsQuery} />
}
