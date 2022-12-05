import { FC } from 'react'

import { useAllPosts } from '../../Posts/PostsApi'
import { Glass } from '../../UI/Glass'
import { InfiniteScroll } from '../../UI/InfiniteScroll'
import { GalleryTitle } from '../GalleryTitle'
import { PostGallery } from '../PostGallery'

export const AllPostsGallery: FC = () => {
  const postsQuery = useAllPosts()
  const onFetchNextPage = () => postsQuery.fetchNextPage()

  if (postsQuery.isError) {
    return <Glass>Error loading gallery. :(</Glass>
  } else if (postsQuery.data) {
    const posts = postsQuery.data.pages.flat()

    return (
      <Glass>
        <GalleryTitle>All Posts</GalleryTitle>
        <InfiniteScroll
          fetchingNextPage={postsQuery.isFetchingNextPage}
          hasNextPage={postsQuery.hasNextPage || false}
          fetchNextPage={onFetchNextPage}
        >
          <PostGallery posts={posts} rowHeight={250} />
        </InfiniteScroll>
      </Glass>
    )
  } else {
    return <Glass>Loading...</Glass>
  }
}
