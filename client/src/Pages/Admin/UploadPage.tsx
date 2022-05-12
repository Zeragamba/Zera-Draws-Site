import { ChangeEvent, FC, useState } from 'react'

import { Glass } from '../../Components/UI/Glass'
import { PicturesApi } from '../../Lib/ServerApi'

export const UploadPage: FC = () => {
  const [images, setImages] = useState<FileList | null>(null)

  const handleFilePicked = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList
    setImages(files)
  }

  const handleUpload = () => {
    if (!images || images.length <= 0) return

    const uploads = Object.values(images).map(image => {
      return PicturesApi.postImage({ image: image, title: image.name })
    })

    Promise.all(uploads)
      .then(pictures => console.log(pictures))
      .catch(error => console.error(error))
  }

  return (
    <Glass style={{ padding: 16 }}>
      <h1>Upload Picture</h1>
      <div>
        <input type="file" accept="image/*" onChange={handleFilePicked} multiple />
      </div>
      {images && (
        <div>
          <div>
            {Object.values(images).map(image => (
              <img key={image.name} style={{ height: 200 }} title="Image to Upload" src={URL.createObjectURL(image)} />
            ))}
          </div>
          <div>
            <button value="Upload" onClick={handleUpload}>Upload</button>
          </div>
        </div>
      )}
    </Glass>
  )
}
