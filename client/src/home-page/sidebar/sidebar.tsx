import { FC } from 'react';

import { DeviantArtTile, DiscordTile, KoFiTile, PatreonTile, RedditTile, TwitterTile } from './sidebar-item';
import { Glass } from '../../ui/glass';

import styles from './sidebar.module.scss';

export const Sidebar: FC = () => (
  <Glass className={styles.socialNav}>
    <nav>
      <DeviantArtTile />
      <TwitterTile />
      <DiscordTile />
      <PatreonTile />
      <KoFiTile />
      <RedditTile />
    </nav>
  </Glass>
);
