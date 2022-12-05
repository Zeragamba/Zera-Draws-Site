import { Box, Button } from '@mui/material'
import classnames from 'classnames'
import { FC } from 'react'

import { Image } from '../../Images/Image'
import { ImagePicker } from '../../Images/ImagePicker'

import styles from './PostImagePicker.module.scss'

interface PostImagePickerProps {
  image: Image
  onImageChange: (file: File) => void
  onRemove: () => void
  primary?: boolean
}

export const PostImagePicker: FC<PostImagePickerProps> = ({
  image,
  onImageChange,
  onRemove,
  primary = false,
}) => {
  const { filename, srcs } = image
  const src = srcs.gallery || srcs.full

  const onFilesPicked = (files: File[]) => {
    onImageChange(files[0])
  }

  return (
    <Box className={classnames(styles.image, primary && styles.primary)}>
      <Box className={styles.imgWrapper}>
        <img src={src} alt={filename} />
      </Box>
      <Box className={styles.actionsWrapper}>
        <ImagePicker onFilesPicked={onFilesPicked}>
          <Button fullWidth variant={'contained'} size={'small'}>
            Replace
          </Button>
        </ImagePicker>
        <Button fullWidth onClick={onRemove} variant={'contained'} size={'small'}>
          Remove
        </Button>
      </Box>
    </Box>
  )
}
