import React from 'react';

import {Picture} from "../ServerApi/pictures";
import {Tile} from "./tile";

import styles from './gallery.module.scss';

interface Props {
  title?: string;
  reverse?: boolean;
  images: Picture[];
}

function sortById(a: Picture, b: Picture): number {
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
