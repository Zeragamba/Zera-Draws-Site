import { FC } from 'react'

import { Glass } from '../../../UI/Glass'
import { DeviantArtTile, DiscordTile, KoFiTile, RedditTile, TwitterTile } from './SidebarItem'

import styles from './Sidebar.module.scss'

export const Sidebar: FC = () => (
  <Glass className={styles.socialNav}>
    <nav>
      <TwitterTile />
      <DiscordTile />
      <DeviantArtTile />
      <KoFiTile />
      <RedditTile />
    </nav>
  </Glass>
)
