import {
  faDeviantart,
  faDiscord,
  faMastodon,
  faPixiv,
  faThreads,
  faTumblr,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FC, ReactNode } from 'react'

import { NavItem } from './NavItem'
import { SidebarGroup } from './SidebarGroup'
import { FontAwesomeIcon } from '../../../../Lib/Icons/FontAwesomeIcon'
import { IconBluesky } from '../../../../Lib/Icons/IconBluesky'


type SocialLink = {
  icon: ReactNode
  label: string
  url: string
}

const socials: SocialLink[] = [
  { icon: <FontAwesomeIcon icon={faDiscord} />, label: 'Discord', url: 'https://example.com' },
  { icon: <FontAwesomeIcon icon={faDeviantart} />, label: 'DeviantArt', url: 'https://example.com' },
  { icon: <FontAwesomeIcon icon={faPixiv} />, label: 'Pixiv', url: 'https://example.com' },
  { icon: <FontAwesomeIcon icon={faTumblr} />, label: 'Tumblr', url: 'https://example.com' },
  { icon: <IconBluesky />, label: 'Bluesky', url: 'https://example.com' },
  { icon: <FontAwesomeIcon icon={faTwitter} />, label: 'Twitter', url: 'https://example.com' },
  { icon: <FontAwesomeIcon icon={faMastodon} />, label: 'Mastodon', url: 'https://example.com' },
  { icon: <FontAwesomeIcon icon={faThreads} />, label: 'Threads', url: 'https://example.com' },
]

interface SocialsGroupProps {
  iconsOnly?: ReactNode
}

export const SocialsGroup: FC<SocialsGroupProps> = ({
  iconsOnly,
}) => {
  return (
    <SidebarGroup>
      {socials.map((social) => (
        <NavItem
          key={social.label}
          adornments={{ left: social.icon }}
          label={iconsOnly ? null : social.label}
          to={social.url}
        />
      ))}
    </SidebarGroup>
  )
}