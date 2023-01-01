import { UseInfiniteQueryResult } from '@tanstack/react-query'
import { FC, MouseEvent, ReactNode, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { useHistory } from '../../App/AppRouter'
import { Post } from '../Posts/Post'
import { ViewPostDialog } from '../Posts/ViewPost/ViewPostDialog'
import { Glass } from '../UI/Glass'
import { InfiniteScroll } from '../UI/InfiniteScroll'
import { GalleryConfig } from './GalleryContext'
import { GalleryItem } from './GalleryItem'
import { GalleryTitle } from './GalleryTitle'
import { GalleryWrapper } from './GalleryWrapper'

interface PostGalleryProps extends Omit<GalleryConfig, 'rowHeight'> {
  title?: string
  rowHeight?: number
  postsQuery: UseInfiniteQueryResult<Post[]>
}

export const PostGallery: FC<PostGalleryProps> = ({
  title,
  postsQuery,
  rowHeight = 250,
  ...galleryConfig
}) => {
  const { pathname } = useLocation()
  const history = useHistory()
  const [ activePost, setActivePost ] = useState<Post['id'] | null>(null)

  const onFetchNextPage = () => postsQuery.fetchNextPage()

  const getPostPath = (post: Post) => {
    if (galleryConfig.tagSlug) {
      return `/tag/${galleryConfig.tagSlug}/${post.slug}`
    } else if (galleryConfig.gallerySlug) {
      return `/gallery/${galleryConfig.gallerySlug}/${post.slug}`
    } else {
      return `/post/${post.slug}`
    }
  }

  const onPostClick = (event: MouseEvent, post: Post) => {
    event.preventDefault()
    setActivePost(post.id)
    history.replace(getPostPath(post))
  }

  const onDialogClose = () => {
    setActivePost(null)
    history.replace(pathname)
  }

  let content: ReactNode
  if (postsQuery.isError) {
    content = <Glass>Error loading gallery. :(</Glass>
  } else if (postsQuery.isLoading) {
    content = <Glass>Loading...</Glass>
  } else {
    const posts = postsQuery.data.pages.flat()

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
    <Glass padding={0}>
      {title && (
        <GalleryTitle>{title}</GalleryTitle>
      )}

      {content}

      {activePost && <ViewPostDialog postId={activePost} onClose={onDialogClose} open />}
    </Glass>
  )
}
