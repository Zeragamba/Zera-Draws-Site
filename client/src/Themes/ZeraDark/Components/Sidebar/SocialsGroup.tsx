import { FC, ReactNode } from 'react'

import { NavItem } from './NavItem'
import { SidebarGroup } from './SidebarGroup'
import { SocialPlatform } from '../../../../Lib'
import { useSocialPlatforms$ } from '../../../../Queries'
import { SocialLogo } from '../../../BaseTheme'

interface SocialsGroupProps {
  iconsOnly?: ReactNode
}

export const SocialsGroup: FC<SocialsGroupProps> = ({
  iconsOnly,
}) => {
  const socials = useSocialPlatforms$()

  return (
    <SidebarGroup>
      {Object.entries(socials).map(([ name, url ]) => (
        <NavItem
          key={name}
          adornments={{ left: <SocialLogo platform={name as SocialPlatform} /> }}
          label={iconsOnly ? null : name}
          to={url}
        />
      ))}
    </SidebarGroup>
  )
}
