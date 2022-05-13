import { faCheck, faTriangleExclamation, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChangeEvent, FC, useState } from 'react'

import { isServerApiError, PicturesApi } from '../../../Lib/ServerApi'

type State = 'idle' | 'uploading' | 'uploaded' | 'error'

type FormState = {
  title: string
}

export const PictureUploader: FC = () => {
  const [file, setFile] = useState<File>()
  const [state, setState] = useState<State>('idle')
  const [error, setError] = useState<string>()

  const [form, setForm] = useState<FormState>({ title: '' })

  const handleFilePicked = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList
    const file = files[0]

    setError(undefined)
    setState('idle')

    const title = file.name.replace(/\.[^/.]+$/, '')
    setFile(file)
    setForm({ title })
  }

  const handleFormChange = (field: keyof FormState) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: event.target.value })
    }
  }

  const handleUpload = () => {
    if (!file) return
    if (state != 'idle') return

    setState('uploading')
    PicturesApi.postImage({ image: file, title: form.title })
      .then(() => setState('uploaded'))
      .catch((error) => {
        setState('error')

        if (isServerApiError(error)) {
          setError(error.response.data.error)
        } else {
          setError(error.toString())
        }
      })
  }

  return (
    <div>
      <div>
        <input type="file" accept="image/*" onChange={handleFilePicked} />
      </div>

      {file && (
        <div>
          <div>
            <img style={{ height: 200 }} title="Image to Upload" src={URL.createObjectURL(file)} />
          </div>

          <div>
            <label>
              Title
              <input type="text" value={form.title} onChange={handleFormChange('title')} />
            </label>
          </div>

          <div>
            {state === 'idle' && (
              <button value="Upload" onClick={handleUpload}>Upload</button>
            )}
            {state === 'uploading' && (
              <><FontAwesomeIcon icon={faUpload} /> Uploading...</>
            )}
            {state === 'uploaded' && (
              <><FontAwesomeIcon icon={faCheck} /> Uploaded</>
            )}
            {state === 'error' && (
              <><FontAwesomeIcon icon={faTriangleExclamation} /> ERROR: {error}</>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
