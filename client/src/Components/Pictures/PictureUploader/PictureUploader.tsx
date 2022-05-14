import { faCheck, faTriangleExclamation, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChangeEvent, FC, useMemo, useState } from 'react'

import { isServerApiError, PicturesApi, PostPictureParams } from '../../../Lib/ServerApi'
import { PictureForm, TextFields, usePictureFormState } from '../PictureForm'

type NetworkState = 'idle' | 'uploading' | 'uploaded' | 'error'

export const PictureUploader: FC = () => {
  const [networkState, setNetworkState] = useState<NetworkState>('idle')
  const [error, setError] = useState<string>()
  const [form, dispatch] = usePictureFormState()

  const image = form.image
  const imageSrc = useMemo(
    () => image ? URL.createObjectURL(image) : undefined,
    [image],
  )

  const handleFilePicked = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList
    const image = files[0]

    dispatch({ type: 'setImage', image })
    setError(undefined)
    setNetworkState('idle')
  }

  const handleFormChange = (field: keyof TextFields, value: string) => {
    dispatch({ type: 'setField', field, value })
  }

  const handleUpload = () => {
    if (!image) return
    if (networkState != 'idle') return

    setNetworkState('uploading')
    setError(undefined)

    const payload: PostPictureParams = {
      image: image,
      title: form.title.value,
      date: form.date.value,
      slug: form.slug.value,
      description: form.description.value,
    }

    PicturesApi.postImage(payload)
      .then(() => setNetworkState('uploaded'))
      .catch((error) => {
        if (isServerApiError(error)) {
          setError(error.response.data.error)
        } else {
          setError(error.toString())
        }

        setNetworkState('idle')
      })
  }

  return (
    <div style={{ width: 250 }}>
      {imageSrc && (
        <img style={{ width: '100%' }} title="Image to Upload" src={imageSrc} />
      )}

      <div>
        <input type="file" accept="image/*" onChange={handleFilePicked} />
      </div>

      <PictureForm
        title={form.title}
        date={form.date}
        slug={form.slug}
        description={form.description}
        onFieldChange={handleFormChange}
      />

      <div>
        {networkState === 'idle' && (
          <button value="Upload" onClick={handleUpload}>Upload</button>
        )}
        {networkState === 'uploading' && (
          <><FontAwesomeIcon icon={faUpload} /> Uploading...</>
        )}
        {networkState === 'uploaded' && (
          <><FontAwesomeIcon icon={faCheck} /> Uploaded</>
        )}
        {error && (
          <><FontAwesomeIcon icon={faTriangleExclamation} /> ERROR: {error}</>
        )}
      </div>
    </div>
  )
}
