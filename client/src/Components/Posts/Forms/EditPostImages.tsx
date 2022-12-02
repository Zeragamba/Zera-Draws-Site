import { Button, Stack } from '@mui/material'
import { FC, useRef } from 'react'

import { useDragActive } from '../../../Hooks/UseDragActive'
import { EditableImage, Image } from '../../../Lib/ServerApi'
import { ImagePicker } from '../../Images/ImagePicker'
import { Glass } from '../../UI/Glass'
import { PostImagePicker } from './PostImagePicker'

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
  const dragRef = useRef<HTMLButtonElement>(null)
  const dragActive = useDragActive(dragRef)

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
            onRemove={() => onRemove(image)}
            primary={index === 0}
          />
        ))}
      </Stack>

      <ImagePicker onFilesPicked={onImagesAdded} multiple>
        <Button variant={dragActive ? 'contained' : 'outlined'} fullWidth ref={dragRef}>
          Add Images
        </Button>
      </ImagePicker>
    </Glass>
  )
}
