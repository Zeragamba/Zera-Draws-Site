import { FC, ReactNode } from "react"
import { SocialPlatform, useSocialPlatforms$ } from "../../../Lib"
import { SocialLogo } from "../Icons"
import { NavItem } from "./NavItem"
import { SidebarGroup } from "./SidebarGroup"

interface SocialsGroupProps {
  iconsOnly?: ReactNode
}

export const SocialsGroup: FC<SocialsGroupProps> = ({ iconsOnly }) => {
  const socials$ = useSocialPlatforms$()
  const socials = Object.entries(socials$.data || {}).filter(
    ([_, url]) => url.trim() !== "",
  )

  return (
    <SidebarGroup>
      {socials.map(([name, url]) => (
        <NavItem
          key={name}
          adornments={{
            left: <SocialLogo platform={name as SocialPlatform} />,
          }}
          label={iconsOnly ? null : name}
          to={url}
        />
      ))}
    </SidebarGroup>
  )
}
