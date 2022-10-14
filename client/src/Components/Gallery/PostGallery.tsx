import { FC, useState } from 'react'

import { Post } from '../../Lib/ServerApi'
import { ViewPostDialog } from '../Posts/ViewPostDialog'
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
  const [ activePost, setActivePost ] = useState<Post['id'] | null>(null)

  return (
    <>
      <Gallery {...galleryConfig}>
        {posts.map(post => (
          <GalleryItem
            key={post.id}
            image={post.images[0]}
            date={post.date}
            title={post.title}
            onClick={() => setActivePost(post.id)}
          />
        ))}
      </Gallery>
      {activePost && <ViewPostDialog postId={activePost} onClose={() => setActivePost(null)} open />}
    </>
  )
}
