import { Button, Stack } from '@mui/material'
import { FC } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { PostImagePicker, PostImagePickerProps } from './PostImagePicker'
import { useSortable } from '../../../../../Hooks'
import { EditableImage, ImageData } from '../../../../../Models'
import { ImagePicker } from '../../Images'

interface EditPostImagesProps {
  images: ImageData[]
  onRemove: (image: ImageData) => void
  onEdit: (image: ImageData, changes: Partial<EditableImage>) => void
  onAdd: (image: Required<EditableImage>) => void
}

export const EditPostImages: FC<EditPostImagesProps> = ({
  images = [],
  onRemove,
  onEdit,
  onAdd,
}) => {
  const [ orderedImages, reorderImage ] = useSortable(images)

  const onImagesAdded = (files: File[]) => {
    files.forEach((file, index) => {
      onAdd({ filename: file.name, file, position: images.length + index })
    })
  }

  const onImageOrderHover = (id: ImageData['id'], position: number) => {
    reorderImage(id, position)
  }

  const onImageOrderDrop = () => {
    orderedImages.forEach((image, index) => {
      onEdit(image, { position: index })
    })
  }

  return (
    <Stack gap={2}>
      {images.length >= 1 && (
        <Stack direction="row" gap={2} sx={{ flexWrap: 'wrap' }} width={'100%'}>
          {orderedImages.map((image, index) => (
            <PostImageItem
              onOrderHover={onImageOrderHover}
              onOrderDrop={onImageOrderDrop}
              key={image.id}
              image={image}
              onImageChange={(file) => onEdit(image, { filename: file.name, file })}
              onRemove={() => onRemove(image)}
              primary={index === 0}
            />
          ))}
        </Stack>
      )}

      <ImagePicker onFilesPicked={onImagesAdded} multiple>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          sx={{ minHeight: orderedImages.length === 0 ? 200 : undefined }}
        >
          Add Images
        </Button>
      </ImagePicker>
    </Stack>
  )
}

interface PostImageItemProps extends PostImagePickerProps {
  onOrderHover: (postId: ImageData['id'], position: number) => void
  onOrderDrop: (postId: ImageData['id'], position: number) => void
}

const PostImageItem: FC<PostImageItemProps> = ({
  onOrderHover,
  onOrderDrop,
  image,
  ...pickerProps
}) => {
  const [ _dragProps, dragHandleRef, dragPreviewRef ] = useDrag<{ id: string }>({
    type: 'image',
    item: { id: image.id },
  })

  const [ _dropProps, dropRef ] = useDrop<{ id: string }>({
    accept: 'image',
    hover: (item) => {
      if (item.id === image.id) return
      onOrderHover(item.id, image.position)
    },
    drop: item => {
      onOrderDrop(item.id, image.position)
    },
  })

  return (
    <PostImagePicker
      image={image}
      {...pickerProps}
      containerRef={node => {
        dragHandleRef(node)
        dropRef(node)
      }}
      imageRef={dragPreviewRef}
    />
  )
}
