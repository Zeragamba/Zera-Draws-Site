import { FC } from 'react'

import { useAllPosts } from '../../Lib/ServerApi'
import { Glass } from '../UI/Glass'
import { Gallery, GallerySizes } from './Gallery'

export const AllPostsGallery: FC = () => {
  const postsQuery = useAllPosts()
  const onFetchNextPage = () => postsQuery.fetchNextPage()

  if (postsQuery.isError) {
    return <Glass>Error loading gallery. :(</Glass>
  } else if (postsQuery.data) {
    const posts = postsQuery.data.pages.flat()

    return <Gallery
      title="All"
      posts={posts}
      gallerySize={GallerySizes.SMALL}
      infinite
      fetchingNextPage={postsQuery.isFetchingNextPage}
      hasNextPage={postsQuery.hasNextPage}
      fetchNextPage={onFetchNextPage}
    />
  } else {
    return <Glass>Loading...</Glass>
  }
}
