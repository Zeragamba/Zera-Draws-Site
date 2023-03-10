import { ChangeEvent, FC, ReactNode, useRef } from 'react'

import { useFilesDropped } from '../../Lib/Hooks/UseFilesDropped'

type ImagePickerProps = {
  onFilesPicked: (files: File[]) => void
  disabled?: boolean
  multiple?: boolean
  children?: ReactNode
}

export const ImagePicker: FC<ImagePickerProps> = ({
  onFilesPicked,
  disabled = false,
  multiple = false,
  children,
}) => {
  const dropRef = useRef<HTMLDivElement>(null)
  const fileSelectRef = useRef<HTMLInputElement>(null)

  const onFilesChanged = (files: File[]) => {
    if (disabled) return
    onFilesPicked(multiple ? files : Array.of(files[0]))
  }

  useFilesDropped(dropRef, onFilesChanged)

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList
    onFilesChanged([ ...files ])
  }

  const onButtonClick = () => {
    if (disabled) return
    if (!fileSelectRef.current) return
    fileSelectRef.current.click()
  }

  return (
    <>
      <div ref={dropRef} onClick={onButtonClick}>
        {children}
      </div>

      <input
        style={{ display: 'none' }}
        type="file"
        accept="image/*"
        onChange={onInputChange}
        ref={fileSelectRef}
        disabled={disabled}
        multiple={multiple}
      />
    </>
  )
}
