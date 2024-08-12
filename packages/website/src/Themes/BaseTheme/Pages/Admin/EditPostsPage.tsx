import { FC } from 'react'

import { useAllPosts$ } from '../../../../Queries'
import { AdminPostsList, InfiniteScroll } from '../../Components'

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
          <AdminPostsList posts={posts$.data} />
        </InfiniteScroll>
      )}
    </>
  )
}
