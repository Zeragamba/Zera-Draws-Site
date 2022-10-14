import classnames from 'classnames'
import { FC } from 'react'

import { useInViewport } from '../../Lib/InViewport'
import { Image } from '../../Lib/ServerApi'
import { noOp } from '../../Lib/util'
import { Spinner } from '../UI/Spinner'
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
  const [ wrapperRef, inViewport ] = useInViewport()

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
      <Spinner className={styles.spinner} />
    </div>
  )
}
