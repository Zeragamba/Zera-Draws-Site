import classnames from 'classnames'
import { FC, useState } from 'react'

import { Picture } from '../../Lib/ServerApi/Models'
import { ViewDialog } from '../ViewDialog'

import styles from './GalleryImages.module.scss'


export enum GallerySizes {
  SMALL = 250,
  LARGE = 300
}

interface GalleryImagesProps {
  pictures: Picture[]
  gallerySize: GallerySizes
}

export const GalleryImages: FC<GalleryImagesProps> = ({
  pictures,
  gallerySize,
}) => {
  return (
    <div className={styles.row}>
      {curatePictures(pictures, gallerySize).map((picture) => (
        <GalleryItem key={picture.id} picture={picture} />
      ))}
    </div>
  )
}

interface CuratedPicture extends Picture {
  galleryHeight: number
  galleryWidth: number
}

interface GalleryItemProps {
  picture: CuratedPicture
}

const GalleryItem: FC<GalleryItemProps> = ({ picture }) => {
  const [ dialogOpen, setDialogOpen ] = useState<boolean>(false)
  const handleClick = () => setDialogOpen(true)

  return (
    <div className={styles.item} style={{ height: picture.galleryHeight, width: picture.galleryWidth }}>
      <div className={classnames(styles.metadata, styles.metadataTop)}>{picture.date}</div>
      <img className={styles.image} src={picture.srcs.gallery} alt={picture.title} onClick={handleClick} />
      <div className={classnames(styles.metadata, styles.metadataBottom)}>{picture.title}</div>

      <ViewDialog open={dialogOpen} onClose={() => setDialogOpen(false)} pictureId={picture.id} />
    </div>
  )
}

function curatePictures(pictures: Picture[], rowHeight: number): CuratedPicture[] {
  const curatedPictures: CuratedPicture[] = []

  pictures.forEach((picture) => {
    const curatedPicture: CuratedPicture = { ...picture, galleryWidth: 0, galleryHeight: 0 }
    curatedPictures.push(curatedPicture)

    const ratio = picture.width / picture.height
    curatedPicture.galleryHeight = rowHeight
    curatedPicture.galleryWidth = ratio * rowHeight
  })

  return curatedPictures
}
