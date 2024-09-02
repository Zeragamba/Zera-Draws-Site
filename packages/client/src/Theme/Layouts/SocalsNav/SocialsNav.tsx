import { Stack } from "@mui/material"
import { FC } from "react"

import { SocialLink } from "./SocialLink"
import { SocialPlatform } from "../../../Models"

export const SocialsNav: FC = () => {
  return (
    <Stack direction="row" justifyContent="space-between">
      {Object.values(SocialPlatform).map((platform) => (
        <SocialLink key={platform} platform={platform} />
      ))}
    </Stack>
  )
}
