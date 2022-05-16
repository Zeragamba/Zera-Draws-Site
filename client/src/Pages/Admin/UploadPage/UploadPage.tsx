import { FC } from 'react'

import { PictureUploader } from '../../../Pictures/PictureUploader/PictureUploader'
import { Glass } from '../../../UI/Glass'

export const UploadPage: FC = () => {
  return (
    <Glass style={{ padding: 16 }}>
      <h1>Upload Picture</h1>
      <PictureUploader />
    </Glass>
  )
}
