import { FC } from 'react'

import { SocialPlatform } from '../SiteMeta/SiteMetaData'

import styles from './SocialLogo.module.scss'

import deviantArtLogo from './Logos/deviantart-logo.svg'
import discordLogo from './Logos/discord-logo.svg'
import twitterLogo from './Logos/twitter-logo.svg'

export const socialLogo: Record<SocialPlatform, string> = {
  [SocialPlatform.deviantArt]: deviantArtLogo,
  [SocialPlatform.twitter]: twitterLogo,
  [SocialPlatform.discord]: discordLogo,
}

interface SocialLogoProps {
  platform: SocialPlatform
}

export const SocialLogo: FC<SocialLogoProps> = ({ platform }) => {
  const logo = socialLogo[platform]
  return (<img className={styles.logo} src={logo} alt={platform} />)
}
