import { Box, Button, Stack } from '@mui/material'
import classnames from 'classnames'
import { FC, RefCallback, useEffect, useState } from 'react'

import { Image } from '../../../Lib/ServerApi'
import { ImagePicker } from '../../Images/ImagePicker'

import styles from './EditPostImages.module.scss'

interface PostImagePickerProps {
  image: Image
  onImageChange: (file: File) => void
  onFilenameChange: (filename: string) => void
  onRemove: () => void
  primary?: boolean
}

export const PostImagePicker: FC<PostImagePickerProps> = ({
  image,
  onImageChange,
  onFilenameChange: parentOnFilenameChange,
  onRemove,
  primary = false,
}) => {
  const { filename, srcs } = image
  const src = srcs.gallery || srcs.full

  const [ dragRef, dragActive ] = useDragActive()

  const onFilesPicked = (files: File[]) => {
    onImageChange(files[0])
  }

  const className = classnames(
    styles.image,
    dragActive && styles.dragActive,
    primary && styles.primary,
  )

  return (
    <Stack direction="column" gap={2} className={className}>
      <Box className={styles.imgWrapper} ref={dragRef}>
        <ImagePicker onFilesPicked={onFilesPicked}>
          <img src={src} alt={filename} />
        </ImagePicker>
      </Box>
      <Button onClick={onRemove} variant={'outlined'} size={'small'}>Remove</Button>
    </Stack>
  )
}
export function useDragActive(): [ ref: RefCallback<Element>, dragActive: boolean ] {
  const [ refElement, setRefElement ] = useState<Element | null>(null)
  const [ dragActive, setDragActive ] = useState<boolean>(false)

  useEffect(() => {
    if (!refElement) return

    const dragStart = () => setDragActive(true)
    const dragEnd = () => setDragActive(false)

    refElement.addEventListener('dragStart', dragStart)
    refElement.addEventListener('dragEnter', dragStart)
    refElement.addEventListener('dragLeave', dragEnd)
    refElement.addEventListener('dragStop', dragEnd)
    refElement.addEventListener('drop', dragEnd)

    return () => {
      refElement.removeEventListener('dragStart', dragStart)
      refElement.removeEventListener('dragEnter', dragStart)
      refElement.removeEventListener('dragLeave', dragEnd)
      refElement.removeEventListener('dragStop', dragEnd)
      refElement.removeEventListener('drop', dragEnd)
    }
  }, [ refElement ])

  return [ setRefElement, dragActive ]
}
