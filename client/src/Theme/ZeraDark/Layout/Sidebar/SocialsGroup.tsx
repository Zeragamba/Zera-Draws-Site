import { FC, ReactNode } from 'react'

import { NavItem } from './NavItem'
import { SidebarGroup } from './SidebarGroup'
import { SocialLogo, SocialPlatform, useSocials } from '../../../../Lib'


interface SocialsGroupProps {
  iconsOnly?: ReactNode
}

export const SocialsGroup: FC<SocialsGroupProps> = ({
  iconsOnly,
}) => {
  const socials = useSocials()

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
