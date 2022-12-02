import { Box, Button, Stack } from '@mui/material'
import classnames from 'classnames'
import { FC } from 'react'

import { EditableImage, Image } from '../../../Lib/ServerApi'
import { ImagePicker } from '../../Images/ImagePicker'
import { Glass } from '../../UI/Glass'
import { PostImagePicker, useDragActive } from './PostImagePicker'

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
