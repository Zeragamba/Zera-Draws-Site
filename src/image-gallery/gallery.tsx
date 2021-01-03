import React from 'react';

import {Image} from "./image";
import {Tile} from "./tile";

import styles from './styles.module.scss';

interface Props {
  title?: string;
  images: Image[];
}

export function Gallery(props: Props) {
  return (
    <div>
      {
        props.title
          ? (<div className={styles.galleryTitle}>{props.title}</div>)
          : null
      }
      <div className={styles.galleryGrid}>
        {props.images.map((image) => (
          <Tile key={image.id} image={image} />
        ))}
      </div>
    </div>
  )
}