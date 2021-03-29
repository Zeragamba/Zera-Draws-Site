import React from 'react';

import {Image} from "./image";
import styles from './gallery.module.scss';
import {Tile} from "./tile";

interface Props {
  title?: string;
  reverse?: boolean;
  images: Image[];
}

function sortById (a:Image, b:Image):number {
  if (a.id >= b.id) return 1;
  if (a.id <= b.id) return -1;
  return 0;
}

export function Gallery(props: Props) {
  let images = props.images.sort(sortById);
  if (props.reverse) images = images.reverse();

  return (
    <div className={styles.gallery}>
      {
        props.title
          ? (<div className={styles.galleryTitle}>{props.title}</div>)
          : null
      }
      <div className={styles.galleryGrid}>
        {images.map((image) => (
          <Tile key={image.id} image={image} />
        ))}
      </div>
    </div>
  )
}