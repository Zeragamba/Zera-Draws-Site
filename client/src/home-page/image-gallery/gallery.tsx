import React, { FC } from 'react';

import { Picture } from '../../server-api/pictures';
import { GalleryItem } from './gallery-item';
import { Glass } from '../../ui/glass';

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
    <Glass>
      {
        title
          ? (<div className={styles.galleryTitle}>{title}</div>)
          : null
      }
      <div className={styles.galleryGrid}>
        {pictures.map((image) => (
          <GalleryItem key={image.id} picture={image} />
        ))}
      </div>
    </Glass>
  );
};
