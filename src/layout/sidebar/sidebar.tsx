import React from "react";

import {DeviantArtTile, KoFiTile, RedditTile, TwitterTile} from "./tile";

import styles from './sidebar.module.scss';

export const Sidebar = () => (
    <div className={styles.sidebar}>
      <nav className={styles.socialNav}>
          <DeviantArtTile />
          <TwitterTile />
          <RedditTile />
          <KoFiTile />
      </nav>
    </div>
)
