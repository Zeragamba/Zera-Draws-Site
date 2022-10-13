import { Button } from '@mui/material'
import { ChangeEvent, FC, useEffect, useRef } from 'react'

const defaultScope = document.querySelector('body') as HTMLBodyElement

interface PostPickerProps {
  dropScope?: Element
  onFilesPicked: (files: File[]) => void
  disabled?: boolean
}

export const ImagePicker: FC<PostPickerProps> = ({
  dropScope = defaultScope,
  onFilesPicked,
  disabled = false,
}) => {
  const fileSelectRef = useRef<HTMLInputElement>(null)

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList
    onFilesPicked([ ...files ])
  }

  const onButtonClick = () => {
    if (disabled || !fileSelectRef.current) return
    fileSelectRef.current.click()
  }

  useEffect(() => {
    const onDragOver = (event: Event) => {
      // Prevent default behavior (Prevent file from being opened)
      event.preventDefault()
    }

    const onDrop = (event: Event) => {
      if (!(event instanceof DragEvent)) return
      if (!event.dataTransfer) return

      // Prevent default behavior (Prevent file from being opened)
      event.preventDefault()

      const files: File[] = []

      if (event.dataTransfer.items) {
        for (const item of event.dataTransfer.items) {
          const file = item.getAsFile()
          if (file) files.push(file)
        }
      } else {
        for (const file of event.dataTransfer.files) {
          files.push(file)
        }
      }

      const images = files.filter(file => file.type.match(/^image\//))
      if (images.length === 0) return

      onFilesPicked(images)
    }

    dropScope.addEventListener('drop', onDrop)
    dropScope.addEventListener('dragover', onDragOver)

    return () => {
      dropScope.removeEventListener('drop', onDrop)
      dropScope.removeEventListener('dragover', onDragOver)
    }
  }, [])

  return (
    <>
      <Button variant="outlined" onClick={onButtonClick} disabled={disabled}>
        Upload images
      </Button>

      <input
        style={{ display: 'none' }}
        type="file"
        accept="image/*"
        onChange={onInputChange}
        ref={fileSelectRef}
        disabled={disabled}
        multiple
      />
    </>
  )
}
