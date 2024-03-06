import { FC } from 'react'

import { AdminPostsList, InfiniteScroll } from '../../Components'
import { useAllPosts$ } from '../../Lib'

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
