import { FC } from 'react'

import { AdminPostsList } from './AdminPostsList'
import { useAllPosts$ } from '../../Posts/PostsApi'
import { InfiniteScroll } from '../../UI/InfiniteScroll'

export const EditPostsPage: FC = () => {
  const posts$ = useAllPosts$()

  return (
    <>
      {posts$.data && (
        <InfiniteScroll
          fetchingNextPage={posts$.isFetchingNextPage}
          hasNextPage={posts$.hasNextPage || false}
          fetchNextPage={() => posts$.fetchNextPage()}
        >
          <AdminPostsList posts={posts$.data.pages.flat()} />
        </InfiniteScroll>
      )}
    </>
  )
}
