import { Paper } from '@mui/material'
import { UseInfiniteQueryResult } from '@tanstack/react-query'
import { FC, MouseEvent, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { GalleryConfig } from './GalleryContext'
import { GalleryItem } from './GalleryItem'
import { GalleryTitle } from './GalleryTitle'
import { GalleryWrapper } from './GalleryWrapper'
import { PostData } from '../Posts/PostData'
import { InfiniteScroll } from '../UI/InfiniteScroll'

export interface PostGalleryProps extends Omit<GalleryConfig, 'rowHeight'> {
  title?: string
  rowHeight?: number
  postsQuery: UseInfiniteQueryResult<PostData[]>
}

export const PostGallery: FC<PostGalleryProps> = ({
  title,
  postsQuery,
  rowHeight = 175,
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

  let content: ReactNode
  if (postsQuery.isError) {
    content = <Paper>Error loading gallery. :(</Paper>
  } else if (postsQuery.isPending) {
    content = <Paper>Loading...</Paper>
  } else {
    const posts = postsQuery.data

    content = (
      <InfiniteScroll
        fetchingNextPage={postsQuery.isFetchingNextPage}
        hasNextPage={postsQuery.hasNextPage || false}
        fetchNextPage={onFetchNextPage}
      >
        <GalleryWrapper rowHeight={rowHeight} {...galleryConfig}>
          {posts.map(post => (
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

  return (
    <Paper>
      {title && <GalleryTitle>{title}</GalleryTitle>}
      {content}
    </Paper>
  )
}
