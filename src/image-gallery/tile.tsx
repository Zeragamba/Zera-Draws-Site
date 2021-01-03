import React from 'react';
import classnames from 'classnames';

import {Image} from "./image";

import styles from './styles.module.scss';

interface Props {
  image: Image;
}

export function Tile({image}: Props) {
  const classNames = classnames(
    styles.image,
    image.isWide ? styles.imageWide : styles.imageTall,
  );

  return (
    <div className={styles.tileWrapper}>
      <img className={classNames} src={image.src} title={image.title} alt={image.title} />
    </div>
  )
}