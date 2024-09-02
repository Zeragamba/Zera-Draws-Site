import { Stack } from "@mui/material"
import { FC } from "react"
import { SocialPlatform } from "../../../Lib"
import { SocialLink } from "./SocialLink"

export const SocialsNav: FC = () => {
  return (
    <Stack direction="row" justifyContent="space-between">
      {Object.values(SocialPlatform).map((platform) => (
        <SocialLink key={platform} platform={platform} />
      ))}
    </Stack>
  )
}
