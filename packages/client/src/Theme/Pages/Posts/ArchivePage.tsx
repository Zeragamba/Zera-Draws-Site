import { FC } from "react"

import { useAllPosts$ } from "../../../Queries"
import { InfiniteScroll, PostsList } from "../../Components"
import { ErrorPage } from "../ErrorPage"
import { LoadingPage } from "../LoadingPage"

export const ArchivePage: FC = () => {
  const posts$ = useAllPosts$()

  if (posts$.isPending) return <LoadingPage />
  if (posts$.isError) return <ErrorPage error={String(posts$.error)} />
  const posts = posts$.data

  return (
    <InfiniteScroll
      fetchingNextPage={posts$.isFetchingNextPage}
      hasNextPage={posts$.hasNextPage || false}
      fetchNextPage={() => posts$.fetchNextPage()}
    >
      <PostsList posts={posts} />
    </InfiniteScroll>
  )
}
