import React from 'react';

import {Image} from "./image";
import styles from './tile.module.scss';

interface Props {
  image: Image;
}

export function Tile({image}: Props) {
  return (
    <div className={styles.tileWrapper}>
      <img className={styles.image} src={image.src} title={image.title} alt={image.title} />
    </div>
  )
}