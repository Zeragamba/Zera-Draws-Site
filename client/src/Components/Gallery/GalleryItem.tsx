import classnames from 'classnames'
import { FC, MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'

import { useInViewport } from '../../Lib/InViewport'
import { Image } from '../../Lib/ServerApi'
import { AsyncImg } from '../UI/AsyncImg'
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

  const a4Ratio = Math.sqrt(2)

  const imgEle = (
    <>
      {inViewport && (
        <AsyncImg className={styles.imgElement} src={image.srcs.gallery || image.srcs.full} alt={title} />
      )}
    </>
  )

  return (
    <div
      className={classnames(styles.item, onClick && styles.hasOnClick)}
      style={{ height: rowHeight, width: (a4Ratio / 2) * rowHeight }}
      ref={wrapperRef}
    >
      {date && <div className={classnames(styles.metadata, styles.metadataTop)}>{date}</div>}
      {linkTo ? (
        <Link to={linkTo} className={styles.image} onClick={onClick}>{imgEle}</Link>
      ) : (
        <div className={styles.image} onClick={onClick}>{imgEle}</div>
      )}
      <div className={classnames(styles.metadata, styles.metadataBottom)}>{title}</div>
    </div>
  )
}
