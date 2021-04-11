import React, {FC} from 'react';

import {Picture} from '../ServerApi/pictures';
import {GalleryTile} from './galleryTile';

import styles from './gallery.module.scss';

interface GalleryProps {
  title?: string;
  reverse?: boolean;
  images: Picture[];
}

function sortById(a: Picture, b: Picture): number {
  if (a.id >= b.id) return 1;
  if (a.id <= b.id) return -1;
  return 0;
}

export const Gallery: FC<GalleryProps> = ({
  images,
  reverse,
  title,
}) => {
  images = images.sort(sortById);
  if (reverse) images = images.reverse();

  return (
    <div className={styles.gallery}>
      {
        title
          ? (<div className={styles.galleryTitle}>{title}</div>)
          : null
      }
      <div className={styles.galleryGrid}>
        {images.map((image) => (
          <GalleryTile key={image.id} picture={image} />
        ))}
      </div>
    </div>
  );
};
