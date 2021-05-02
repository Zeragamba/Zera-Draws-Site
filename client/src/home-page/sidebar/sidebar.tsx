import React, { FC } from 'react';

import { DeviantArtTile, KoFiTile, TwitterTile } from './sidebar-item';
import { Glass } from '../../ui/glass';

import styles from './sidebar.module.scss';

export const Sidebar: FC = () => (
  <Glass className={styles.socialNav}>
    <nav>
      <DeviantArtTile />
      <TwitterTile />
      <KoFiTile />
    </nav>
  </Glass>
);
