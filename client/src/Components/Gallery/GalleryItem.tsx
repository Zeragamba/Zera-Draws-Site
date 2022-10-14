import classnames from 'classnames'
import { FC, useRef } from 'react'

import { Image } from '../../Lib/ServerApi'
import { noOp, useInViewport } from '../../Lib/util'
import { useGalleryContext } from './GalleryContext'

import styles from './GalleryItem.module.scss'


interface GalleryItemProps {
  image: Image
  title: string
  date?: string
  onClick?: () => void
}


export const GalleryItem: FC<GalleryItemProps> = ({
  image,
  title,
  date,
  onClick = noOp,
}) => {
  const { rowHeight } = useGalleryContext()

  const wrapperRef = useRef<HTMLDivElement>(null)
  const inViewport = useInViewport(wrapperRef, { partial: true, expand: 500, interval: 100 })

  const ratio = image.width / image.height

  return (
    <div
      className={styles.item}
      style={{ height: rowHeight, width: ratio * rowHeight }}
      onClick={onClick}
      ref={wrapperRef}
    >
      {date && <div className={classnames(styles.metadata, styles.metadataTop)}>{date}</div>}
      {inViewport && <img className={styles.image} src={image.srcs.gallery || image.srcs.full} alt={title} />}
      <div className={classnames(styles.metadata, styles.metadataBottom)}>{title}</div>
    </div>
  )
}
