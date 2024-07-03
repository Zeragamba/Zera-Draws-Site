import { Paper } from '@mui/material'
import { UseInfiniteQueryResult } from '@tanstack/react-query'
import { FC, MouseEvent, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { GalleryConfig } from './GalleryContext'
import { GalleryItem } from './GalleryItem'
import { GalleryTitle } from './GalleryTitle'
import { GalleryWrapper } from './GalleryWrapper'
import { PostData } from '../../../../Models'
import { InfiniteScroll } from '../Shared'

export interface PostGalleryProps extends Omit<GalleryConfig, 'rowHeight'> {
  title?: string
  rowHeight?: number
  maxItems?: number
  maxRows?: number
  postsQuery: UseInfiniteQueryResult<PostData[]>
}

export const PostGallery: FC<PostGalleryProps> = ({
  title,
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


  let content: ReactNode
  if (postsQuery.isError) {
    console.error(postsQuery.error)
    content = <Paper>Error loading gallery. :(</Paper>
  } else if (postsQuery.isPending) {
    content = <Paper>Loading...</Paper>
  } else {
    const posts = postsQuery.data
    const hasNextPage = (posts.length <= maxItems && postsQuery.hasNextPage)

    content = (
      <InfiniteScroll
        fetchingNextPage={postsQuery.isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={onFetchNextPage}
      >
        <GalleryWrapper rowHeight={rowHeight} {...galleryConfig} maxRows={maxRows}>
          {posts.slice(0, maxItems).map(post => (
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
