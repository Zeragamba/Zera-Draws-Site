import classnames from 'classnames'
import { FC, useState } from 'react'

import { Post } from '../../Lib/ServerApi'
import { ViewPostDialog } from '../Posts/ViewPostDialog'

import styles from './GalleryImages.module.scss'


export enum GallerySizes {
  SMALL = 250,
  LARGE = 300
}

interface GalleryImagesProps {
  posts: Post[]
  gallerySize: GallerySizes
}

export const GalleryImages: FC<GalleryImagesProps> = ({
  posts,
  gallerySize,
}) => {
  return (
    <div className={styles.row}>
      {posts.map((post) => (
        <GalleryPost key={post.id} post={post} rowHeight={gallerySize} />
      ))}
    </div>
  )
}

interface GalleryItemProps {
  post: Post
  rowHeight?: GallerySizes
}

const GalleryPost: FC<GalleryItemProps> = ({ post, rowHeight = GallerySizes.SMALL }) => {
  const [ dialogOpen, setDialogOpen ] = useState<boolean>(false)
  const handleClick = () => setDialogOpen(true)

  const image = post.images[0]

  if (!image) {
    return <div className={styles.item} style={{ height: rowHeight, width: 1 * rowHeight }} />
  }

  const ratio = image.width / image.height

  return (
    <div className={styles.item} style={{ height: rowHeight, width: ratio * rowHeight }}>
      <div className={classnames(styles.metadata, styles.metadataTop)}>{post.date}</div>
      <img className={styles.image} src={image.srcs.gallery} alt={post.title} onClick={handleClick} />
      <div className={classnames(styles.metadata, styles.metadataBottom)}>{post.title}</div>

      <ViewPostDialog open={dialogOpen} onClose={() => setDialogOpen(false)} postId={post.id} />
    </div>
  )
}
