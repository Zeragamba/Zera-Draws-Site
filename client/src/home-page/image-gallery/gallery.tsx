import React, { FC } from 'react';

import { Picture } from '../../server-api/pictures';
import { GalleryTile } from './gallery-tile';

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
  if (reverse) {
    pictures = pictures.reverse();
  }

  return (
    <div className={styles.gallery}>
      {
        title
          ? (<div className={styles.galleryTitle}>{title}</div>)
          : null
      }
      <div className={styles.galleryGrid}>
        {pictures.map((image) => (
          <GalleryTile key={image.id} picture={image} />
        ))}
      </div>
    </div>
  );
};
