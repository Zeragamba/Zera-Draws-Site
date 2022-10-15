import classnames from 'classnames'
import { FC, MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'

import { useInViewport } from '../../Lib/InViewport'
import { Image } from '../../Lib/ServerApi'
import { Spinner } from '../UI/Spinner'
import { useGalleryContext } from './GalleryContext'

import styles from './GalleryItem.module.scss'


interface GalleryItemProps {
  image: Image
  title: string
  date?: string
  linkTo?: string
  onClick?: MouseEventHandler
}

export const GalleryItem: FC<GalleryItemProps> = ({
  image,
  title,
  date,
  linkTo,
  onClick,
}) => {
  const { rowHeight } = useGalleryContext()
  const [ wrapperRef, inViewport ] = useInViewport()

  const ratio = image.width / image.height

  const imgEle = (
    <>{inViewport && <img src={image.srcs.gallery || image.srcs.full} alt={title} />}</>
  )

  return (
    <div
      className={classnames(styles.item, onClick)}
      style={{ height: rowHeight, width: ratio * rowHeight }}
      ref={wrapperRef}
    >
      {date && <div className={classnames(styles.metadata, styles.metadataTop)}>{date}</div>}
      {linkTo ? (
        <Link to={linkTo} className={styles.image} onClick={onClick}>{imgEle}</Link>
      ) : (
        <div className={styles.image} onClick={onClick}>{imgEle}</div>
      )}
      <div className={classnames(styles.metadata, styles.metadataBottom)}>{title}</div>
      <Spinner className={styles.spinner} />
    </div>
  )
}
