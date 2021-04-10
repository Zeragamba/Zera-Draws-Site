import React, {FC} from 'react';

import styles from './sidebar.module.scss';

import {DeviantArtTile, KoFiTile, TwitterTile} from './tile';

export const Sidebar: FC = () => (
  <div className={styles.sidebar}>
    <nav className={styles.socialNav}>
      <DeviantArtTile />
      <TwitterTile />
      <KoFiTile />
    </nav>
  </div>
);
