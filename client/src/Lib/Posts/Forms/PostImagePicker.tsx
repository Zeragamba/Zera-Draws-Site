import { Box, Button, Paper } from '@mui/material'
import classnames from 'classnames'
import React, { FC, Ref } from 'react'

import { ImageData } from '../../Images'
import { ImagePicker } from '../../Images/ImagePicker'

import styles from './PostImagePicker.module.scss'

export interface PostImagePickerProps {
  image: ImageData
  onImageChange: (file: File) => void
  onRemove: () => void
  primary?: boolean
  containerRef?: Ref<HTMLDivElement>
  imageRef?: Ref<HTMLDivElement>
}

export const usePostImagePicker = ({
  image,
  onImageChange,
}: PostImagePickerProps) => {
  const { filename, srcs } = image
  const src = srcs.gallery || srcs.full

  const onFilesPicked = (files: File[]) => {
    onImageChange(files[0])
  }

  return {
    filename,
    src,
    onFilesPicked,
  }
}


export const PostImagePicker: FC<PostImagePickerProps> = ({
  image,
  onImageChange,
  onRemove,
  primary = false,
  containerRef,
  imageRef,
}) => {
  const { filename, srcs } = image
  const src = srcs.gallery || srcs.full

  const onFilesPicked = (files: File[]) => {
    onImageChange(files[0])
  }

  return (
    <Paper className={classnames(styles.image, primary && styles.primary)} ref={containerRef}>
      <Box className={styles.imgWrapper} ref={imageRef}>
        <img src={src} alt={filename} />
      </Box>

      <Box className={styles.actionsWrapper}>
        <ImagePicker onFilesPicked={onFilesPicked}>
          <Button fullWidth variant="contained" size={'small'}>
            Replace
          </Button>
        </ImagePicker>
        <Button fullWidth onClick={onRemove} variant="contained" size={'small'}>
          Remove
        </Button>
      </Box>
    </Paper>
  )
}
