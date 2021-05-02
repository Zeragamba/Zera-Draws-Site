import React, { FC, useRef } from 'react';

import { GalleryItem } from './gallery-item';
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
          ? (<div className={styles.galleryTitle}>{title}</div>)
          : null
      }
      <div>{gridHeight}px x {gridWidth}px</div>
      <div className={styles.galleryGrid} ref={gridRef}>
        {pictures.map((image) => (
          <GalleryItem key={image.id} picture={image} />
        ))}
      </div>
    </Glass>
  );
};

