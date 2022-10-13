import { Stack } from '@mui/material'
import { FC, useState } from 'react'

import { ImagePicker } from '../../../Components/Images/ImagePicker'
import { ImageUploadForm } from '../../../Components/Images/ImageUploadForm'
import { Glass } from '../../../Components/UI/Glass'

export type FileMap = Record<File['name'], File>

export const UploadPage: FC = () => {
  const [ files, setFiles ] = useState<FileMap>({})

  const onFilesPicked = (files: File[]) => {
    const newFiles: FileMap = {}
    files.forEach(file => newFiles[file.name] = file)
    setFiles((files) => ({ ...files, ...newFiles }))
  }

  return (
    <Glass style={{ padding: 16 }}>
      <Stack gap={2}>
        <h1>Upload Post</h1>
        <ImagePicker onFilesPicked={onFilesPicked} />
        {Object.values(files).map(file => <ImageUploadForm key={file.name} image={file} />)}
      </Stack>
    </Glass>
  )
}
