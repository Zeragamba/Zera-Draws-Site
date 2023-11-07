import { FC } from 'react'

import { PublicLayout } from '../Layouts'
import { useAllPosts$ } from '../Posts/PostsApi'
import { PostsList } from '../Posts/PostsList'
import { InfiniteScroll } from '../UI/InfiniteScroll'

export const ArchivePage: FC = () => {
  const posts$ = useAllPosts$()

  return (
    <PublicLayout>
      {posts$.data && (
        <InfiniteScroll
          fetchingNextPage={posts$.isFetchingNextPage}
          hasNextPage={posts$.hasNextPage || false}
          fetchNextPage={() => posts$.fetchNextPage()}
        >
          <PostsList posts={posts$.data} />
        </InfiniteScroll>
      )}
    </PublicLayout>
  )
}
