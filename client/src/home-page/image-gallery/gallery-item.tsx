import React, { FC } from 'react';

import { Picture } from '../../lib/server-api';

import styles from './gallery-item.module.scss';
import classnames from 'classnames';

interface TileProps {
  picture: Picture;
}

export const GalleryItem: FC<TileProps> = ({ picture }) => {
  return (
    <div className={styles.item}>
      <div className={classnames(styles.metadata, styles.metadataTop)}>{picture.date}</div>
      <img className={styles.image} src={picture.srcs.gallery} alt={picture.title} />
      <div className={classnames(styles.metadata, styles.metadataBottom)}>{picture.title}</div>
    </div>
  );
};
