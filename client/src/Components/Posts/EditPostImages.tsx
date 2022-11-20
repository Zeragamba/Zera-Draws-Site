import { Box, Button, Stack, TextField } from '@mui/material'
import classnames from 'classnames'
import { ChangeEvent, FC, RefCallback, useEffect, useState } from 'react'

import { EditableImage, Image } from '../../Lib/ServerApi'
import { ImagePicker } from '../Images/ImagePicker'
import { Glass } from '../UI/Glass'

import styles from './EditPostImages.module.scss'

interface EditPostImagesProps {
  images: Image[]
  onRemove: (image: Image) => void
  onEdit: (image: Image, changes: Partial<EditableImage>) => void
  onAdd: (image: Required<EditableImage>) => void
}

export const EditPostImages: FC<EditPostImagesProps> = ({
  images = [],
  onRemove,
  onEdit,
  onAdd,
}) => {
  const [ dragRef, dragActive ] = useDragActive()

  const onImagesAdded = (files: File[]) => {
    files.forEach(file => {
      onAdd({ filename: file.name, file })
    })
  }

  return (
    <Glass display="flex" flexDirection="column" gap={2}>
      <div>Images</div>

      <Stack direction="row" gap={2} sx={{ flexWrap: 'wrap' }} width={'100%'}>
        {images.map((image, index) => (
          <PostImagePicker
            key={image.id}
            image={image}
            onImageChange={(file) => onEdit(image, { filename: file.name, file })}
            onFilenameChange={(filename) => onEdit(image, { filename })}
            onRemove={() => onRemove(image)}
            primary={index === 0}
          />
        ))}
      </Stack>

      <ImagePicker onFilesPicked={onImagesAdded} multiple>
        <Box className={classnames(dragActive && styles.dragActive)} ref={dragRef}>
          <Button variant="outlined" fullWidth>Add Images</Button>
        </Box>
      </ImagePicker>
    </Glass>
  )
}

interface PostImagePickerProps {
  image: Image
  onImageChange: (file: File) => void
  onFilenameChange: (filename: string) => void
  onRemove: () => void
  primary?: boolean
}

const PostImagePicker: FC<PostImagePickerProps> = ({
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

  const onFilenameChange = (event: ChangeEvent<HTMLInputElement>) => {
    parentOnFilenameChange(event.target.value)
  }

  const className = classnames(
    styles.image,
    dragActive && styles.dragActive,
    primary && styles.primary,
  )

  return (
    <Stack direction="column" gap={2} className={className}>
      <TextField label="Filename" variant="standard" value={filename} onChange={onFilenameChange} />
      <Box className={styles.imgWrapper} ref={dragRef}>
        <ImagePicker onFilesPicked={onFilesPicked}>
          <img src={src} alt={filename} />
        </ImagePicker>
      </Box>
      <Button onClick={onRemove} variant={'outlined'} size={'small'}>Remove</Button>
    </Stack>
  )
}

function useDragActive(): [ ref: RefCallback<Element>, dragActive: boolean ] {
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
