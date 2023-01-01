import { FC, MouseEvent, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { useHistory } from '../../App/AppRouter'
import { Post } from '../Posts/Post'
import { ViewPostDialog } from '../Posts/ViewPost/ViewPostDialog'
import { GalleryConfig } from './GalleryContext'
import { GalleryItem } from './GalleryItem'
import { GalleryWrapper } from './GalleryWrapper'

interface PostGalleryProps extends Omit<GalleryConfig, 'rowHeight'> {
  rowHeight?: number
  posts: Post[]
}

export const PostGallery: FC<PostGalleryProps> = ({
  posts,
  rowHeight = 250,
  ...galleryConfig
}) => {
  const { pathname } = useLocation()
  const history = useHistory()
  const [ activePost, setActivePost ] = useState<Post['id'] | null>(null)

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

  return (
    <>
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
      {activePost && <ViewPostDialog postId={activePost} onClose={onDialogClose} open />}
    </>
  )
}
