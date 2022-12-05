import { FC, MouseEvent, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { useHistory } from '../../App/AppRouter'
import { Post } from '../Posts/Post'
import { ViewPostDialog } from '../Posts/ViewPost/ViewPostDialog'
import { Gallery } from './Gallery'
import { GalleryItem } from './GalleryItem'

interface PostGalleryProps {
  rowHeight?: number
  posts: Post[]
}

export const PostGallery: FC<PostGalleryProps> = ({
  posts,
  ...galleryConfig
}) => {
  const { pathname } = useLocation()
  const history = useHistory()
  const [ activePost, setActivePost ] = useState<Post['id'] | null>(null)

  const getPostPath = (post: Post) => `/post/${post.slug}`

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
      <Gallery {...galleryConfig}>
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
      </Gallery>
      {activePost && <ViewPostDialog postId={activePost} onClose={onDialogClose} open />}
    </>
  )
}
