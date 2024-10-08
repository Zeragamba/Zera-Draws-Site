import {
  faDeviantart,
  faDiscord,
  faMastodon,
  faPixiv,
  faThreads,
  faTumblr,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons"
import { FC, ReactElement } from "react"
import { SocialPlatform } from "../../../Lib"

import { FontAwesomeIcon } from "./FontAwesomeIcon"
import { IconBluesky } from "./IconBluesky"
import { IconGumroad } from "./IconGumroad"

const socialLogoMap: Record<SocialPlatform, ReactElement> = {
  [SocialPlatform.bluesky]: <IconBluesky />,
  [SocialPlatform.deviantArt]: <FontAwesomeIcon icon={faDeviantart} />,
  [SocialPlatform.discord]: <FontAwesomeIcon icon={faDiscord} />,
  [SocialPlatform.gumroad]: <IconGumroad />,
  [SocialPlatform.mastodon]: <FontAwesomeIcon icon={faMastodon} />,
  [SocialPlatform.pixiv]: <FontAwesomeIcon icon={faPixiv} />,
  [SocialPlatform.threads]: <FontAwesomeIcon icon={faThreads} />,
  [SocialPlatform.tumblr]: <FontAwesomeIcon icon={faTumblr} />,
  [SocialPlatform.twitter]: <FontAwesomeIcon icon={faTwitter} />,
}

interface SocialLogoProps {
  platform: SocialPlatform
}

export const SocialLogo: FC<SocialLogoProps> = ({ platform }) => {
  return socialLogoMap[platform] || <FontAwesomeIcon icon={faCircleQuestion} />
}
