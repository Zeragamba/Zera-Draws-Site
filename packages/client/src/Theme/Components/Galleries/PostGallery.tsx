import { Alert, LinearProgress, Paper } from "@mui/material"
import { UseInfiniteQueryResult } from "@tanstack/react-query"
import { FC, MouseEvent } from "react"
import { useNavigate } from "react-router-dom"
import { GalleryConfig, PostData } from "../../../Lib"
import { InfiniteScroll } from "../Shared"

import { GalleryItem } from "./GalleryItem"
import { GalleryWrapper } from "./GalleryWrapper"

export interface PostGalleryProps extends Omit<GalleryConfig, "rowHeight"> {
  rowHeight?: number
  maxItems?: number
  maxRows?: number
  postsQuery: UseInfiniteQueryResult<PostData[]>
}

export const PostGallery: FC<PostGalleryProps> = ({
  postsQuery,
  rowHeight = 250,
  maxItems = Infinity,
  maxRows,
  ...galleryConfig
}) => {
  const navigate = useNavigate()

  const onFetchNextPage = () => postsQuery.fetchNextPage()

  const getPostPath = (post: PostData) => {
    if (galleryConfig.tagSlug) {
      return `/tag/${galleryConfig.tagSlug}/${post.slug}`
    } else if (galleryConfig.gallerySlug) {
      return `/gallery/${galleryConfig.gallerySlug}/${post.slug}`
    } else {
      return `/post/${post.slug}`
    }
  }

  const onPostClick = (event: MouseEvent, post: PostData) => {
    event.preventDefault()
    navigate(getPostPath(post))
  }

  if (postsQuery.isError) {
    console.error(postsQuery.error)
    return <Alert severity={"error"}>Error loading gallery. :(</Alert>
  } else if (postsQuery.isPending) {
    return (
      <Paper>
        <LinearProgress />
      </Paper>
    )
  }
  const posts = postsQuery.data
  const hasNextPage = posts.length <= maxItems && postsQuery.hasNextPage

  return (
    <InfiniteScroll
      fetchingNextPage={postsQuery.isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={onFetchNextPage}
    >
      <GalleryWrapper
        rowHeight={rowHeight}
        {...galleryConfig}
        maxRows={maxRows}
      >
        {posts.slice(0, maxItems).map((post) => (
          <GalleryItem
            key={post.id}
            image={post.images[0]}
            date={post.date}
            title={post.title}
            released={post.released}
            linkTo={getPostPath(post)}
            onClick={(event) => onPostClick(event, post)}
          />
        ))}
      </GalleryWrapper>
    </InfiniteScroll>
  )
}
