import React, { FC, useRef } from 'react';
import classnames from 'classnames';

import { Glass } from '../../ui/glass';
import { useResize } from '../../lib/hooks';
import { Picture } from '../../lib/server-api';

import styles from './gallery.module.scss';

interface GalleryProps {
  title?: string;
  reverse?: boolean;
  pictures: Picture[];
}

export const Gallery: FC<GalleryProps> = ({
  pictures,
  reverse = false,
  title,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { height: gridHeight, width: gridWidth } = useResize(gridRef);

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
        {curatePictures(pictures, 200).map((picture) => (
          <GalleryItem key={pictures.map((picture) => picture.id).join(':')} picture={picture} />
        ))}
      </div>
    </Glass>
  );
};

interface GalleryRowProps {
  pictures: CuratedPicture[];
}

interface CuratedPicture extends Picture {
  galleryHeight: number;
  galleryWidth: number;
}

const GalleryRow: FC<GalleryRowProps> = ({
  pictures,
}) => (
  <div className={styles.row}>
    {pictures.map((image) => (
      <GalleryItem key={image.id} picture={image} />
    ))}
  </div>
);

interface GalleryItemProps {
  picture: CuratedPicture;
}

const GalleryItem: FC<GalleryItemProps> = ({ picture }) => {
  return (
    <div className={styles.item} style={{ height: picture.galleryHeight, width: picture.galleryWidth }}>
      <div className={classnames(styles.metadata, styles.metadataTop)}>{picture.date}</div>
      <img className={styles.image} src={picture.srcs.gallery} alt={picture.title} />
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
