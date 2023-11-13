import { Box, Stack, SxProps } from '@mui/material'
import classnames from 'classnames'
import { FC } from 'react'

import { ImageData } from './ImageData'
import { AsyncImg } from '../UI/AsyncImg'

interface AltImagesViewProps {
  onImageClick: (index: number) => void
  activeIndex: number
  images: ImageData[]
}

const styles: Record<string, SxProps> = {
  row: {
    overflow: 'hidden',
    overflowX: 'auto',
  },

  imageWrapper: {
    position: 'relative',
    display: 'inline-flex',
    height: 100,
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',

    '& img': {
      objectFit: 'cover',
      objectPosition: 'center',
      height: '100%',
      width: '100%',
      borderRadius: 2,
    },

    '&.active img': {
      borderStyle: 'solid',
      borderWidth: '4px',
      borderColor: 'secondary.main',
    },
  },
}

export const AltImagesView: FC<AltImagesViewProps> = ({
  images,
  activeIndex,
  onImageClick,
}) => {
  return (
    <Stack direction={'row'} gap={1} sx={styles.row}>
      {images.map((image, index) => (
        <Box
          key={image.id}
          sx={styles.imageWrapper}
          onClick={() => onImageClick(index)}
          className={classnames({
            'active': index === activeIndex,
          })}
        >
          <AsyncImg src={image.srcs.gallery || image.srcs.full} />
        </Box>
      ))}
    </Stack>
  )
}
