import { Box, Stack, SxProps } from '@mui/material'
import { FC } from 'react'

import { Colours, SocialLogo, SocialPlatform, useIsMobile, useSocials } from '../../../../Lib'

interface SocialLinkProps {
  platform: SocialPlatform
}

export const SocialLink: FC<SocialLinkProps> = ({
  platform,
}) => {
  const socials = useSocials()
  const isMobile = useIsMobile()

  if (!socials[platform]) return null

  const styles: SxProps = {
    textDecoration: 'none',
    color: Colours.light,

    backgroundColor: 'primary.main',
    transition: 'background-color 250ms',
    alignItems: 'center',

    '.logo': {
      display: 'flex',
      width: 36,
      height: 36,
      alignItems: 'center',
      justifyContent: 'center',
    },

    '.label': {
      width: 0,
      overflow: 'hidden',
      transition: 'width 250ms',
    },
  }

  const hoverStyles: SxProps = {
    '&:hover': {
      backgroundColor: 'primary.light',

      '.label': { width: 100 },
    },
  }

  return (
    <Stack
      direction="row"
      component="a"
      role="button"
      href={socials[platform]}
      target="_blank"
      rel="noreferrer"
      sx={[ styles, !isMobile && hoverStyles ]}
    >
      <Box className="logo">
        <SocialLogo platform={platform} />
      </Box>
      <Box className="label">
        <Box sx={{ width: 100 }}>
          {platform}
        </Box>
      </Box>
    </Stack>
  )
}
