import { FC } from 'react'

import { Glass } from '../../../Components/UI/Glass'
import { PictureUploader } from './PictureUploader'

export const UploadPage: FC = () => {
  return (
    <Glass style={{ padding: 16 }}>
      <h1>Upload Picture</h1>
      <PictureUploader />
    </Glass>
  )
}
