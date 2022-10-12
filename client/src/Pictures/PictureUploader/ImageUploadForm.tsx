import { faCheck, faTriangleExclamation, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, FormGroup, Paper, Stack } from '@mui/material'
import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from 'react'

import { EditablePicture, useCreatePicture } from '../../Lib/ServerApi'
import { isServerApiError } from '../../Lib/ServerApi/ServerClient'
import { fieldChanged, imageChanged, ImageForm, TextFields, useImageFormState } from '../ImageForm'

type NetworkState = 'idle' | 'uploading' | 'uploaded' | 'error'

interface PictureUploadFormProps {
  image: File
}

export const ImageUploadForm: FC<PictureUploadFormProps> = ({
  image,
}) => {
  const [ networkState, setNetworkState ] = useState<NetworkState>('idle')
  const [ error, setError ] = useState<string>()
  const [ form, dispatch ] = useImageFormState()
  const createPictureQuery = useCreatePicture()

  const fileSelectRef = useRef<HTMLInputElement>(null)

  const imageSrc = useMemo(
    () => form.image ? URL.createObjectURL(form.image) : undefined,
    [ form.image ],
  )

  const onFilePicked = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList
    const image = files[0]

    onImageChange(image)
  }

  useEffect(() => {
    dispatch(imageChanged(image))
  }, [ dispatch, image ])

  const onImageClick = () => {
    if (networkState !== 'idle') return
    if (fileSelectRef.current) {
      fileSelectRef.current.click()
    }
  }

  const onImageChange = (image: File) => {
    return dispatch(imageChanged(image))
  }

  const onFieldChange = (field: keyof TextFields, value: string) => {
    return dispatch(fieldChanged(field, value))
  }

  const onUploadClick = () => {
    if (!form.image) return
    if (networkState != 'idle') return

    setNetworkState('uploading')
    setError(undefined)

    const picture: EditablePicture = {
      title: form.title.value,
      date: form.date.value,
      slug: form.slug.value,
      description: form.description.value,
    }

    const image = form.image

    createPictureQuery.mutateAsync({ picture, image })
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
    <Paper sx={{ padding: 1 }}>
      <Stack direction="row" gap={1}>
        <div>
          <input
            style={{ display: 'none' }}
            type="file"
            accept="image/*"
            onChange={onFilePicked}
            ref={fileSelectRef}
            disabled={networkState !== 'idle'}
          />

          {imageSrc && (
            <img style={{ width: '200px' }} title="Image to Upload" src={imageSrc} onClick={onImageClick} />
          )}
        </div>

        <Stack gap={1} sx={{ flexGrow: 1 }}>
          {error && (
            <Paper sx={{ backgroundColor: 'darkred', padding: 1 }}>
              <FontAwesomeIcon icon={faTriangleExclamation} /> ERROR: {error}
            </Paper>
          )}

          <ImageForm
            state={form}
            onFieldChange={onFieldChange}
            disabled={networkState !== 'idle'}
          />

          <FormGroup>
            {networkState === 'idle' && (
              <Button
                value="Upload"
                variant="contained"
                onClick={onUploadClick}
              >
                Upload
              </Button>
            )}
            {networkState === 'uploading' && (
              <Paper sx={{ padding: 1 }}>
                <FontAwesomeIcon icon={faUpload} /> Uploading...
              </Paper>
            )}
            {networkState === 'uploaded' && (
              <Paper sx={{ backgroundColor: 'green', padding: 1 }}>
                <FontAwesomeIcon icon={faCheck} /> Uploaded
              </Paper>
            )}
          </FormGroup>
        </Stack>
      </Stack>
    </Paper>
  )
}
