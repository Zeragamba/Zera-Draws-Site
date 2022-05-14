import { FC } from 'react'

import { PictureUploader } from '../../../Components/Pictures/PictureUploader/PictureUploader'
import { Glass } from '../../../Components/UI/Glass'

export const UploadPage: FC = () => {
  return (
    <Glass style={{ padding: 16 }}>
      <h1>Upload Picture</h1>
      <PictureUploader />
    </Glass>
  )
}
