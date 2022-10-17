import { FC } from 'react'

import { Glass } from '../Glass'
import { DeviantArtTile, DiscordTile, KoFiTile, RedditTile, TwitterTile } from './SidebarItem'

import styles from './SocialsNav.module.scss'

export const SocialsNav: FC = () => (
  <Glass className={styles.socialsNav}>
    <nav>
      <TwitterTile />
      <DiscordTile />
      <DeviantArtTile />
      <KoFiTile />
      <RedditTile />
    </nav>
  </Glass>
)
