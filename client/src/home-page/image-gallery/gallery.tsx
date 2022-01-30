import React, { FC, useRef } from 'react';
import classnames from 'classnames';

import { Glass } from '../../ui/glass';
import { Picture } from '../../lib/server-api';

import styles from './gallery.module.scss';

export enum GallerySizes {
  SMALL= 250,
  MEDIUM = 300,
  LARGE= 400
}

interface GalleryProps {
  title?: string;
  reverse?: boolean;
  pictures: Picture[];
  gallerySize: GallerySizes;
}

export const Gallery: FC<GalleryProps> = ({
  pictures,
  reverse = false,
  title,
  gallerySize,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  if (reverse) {
    pictures = pictures.reverse();
  }

  return (
    <Glass>
      {
        title
          ? (<div className={styles.title}>{title}</div>)
          : null
      }
      <div className={styles.row} ref={gridRef}>
        {curatePictures(pictures, gallerySize).map((picture) => (
          <GalleryItem key={picture.id} picture={picture} />
        ))}
      </div>
    </Glass>
  );
};

interface CuratedPicture extends Picture {
  galleryHeight: number;
  galleryWidth: number;
}

interface GalleryItemProps {
  picture: CuratedPicture;
}

const GalleryItem: FC<GalleryItemProps> = ({ picture }) => {
  return (
    <div className={styles.item} style={{ height: picture.galleryHeight, width: picture.galleryWidth }}>
      <div className={classnames(styles.metadata, styles.metadataTop)}>{picture.date}</div>
      <img className={styles.image} src={picture.srcs.low} alt={picture.title} />
      <div className={classnames(styles.metadata, styles.metadataBottom)}>{picture.title}</div>
    </div>
  );
};

function curatePictures(pictures: Picture[], rowHeight: number): CuratedPicture[] {
  const curatedPictures: CuratedPicture[] = [];

  pictures.forEach((picture) => {
    const curatedPicture: CuratedPicture = { ...picture, galleryWidth: 0, galleryHeight: 0};
    curatedPictures.push(curatedPicture);

    const ratio = picture.width / picture.height;
    curatedPicture.galleryHeight = rowHeight;
    curatedPicture.galleryWidth = ratio * rowHeight;
  });

  return curatedPictures;
}
