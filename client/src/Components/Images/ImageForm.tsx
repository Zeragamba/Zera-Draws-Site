import { FormGroup, TextField } from '@mui/material'
import { FC } from 'react'

import { ImageFormState, TextFields } from './useImageFormState'

type ImageFormProps = {
  state: ImageFormState
  onFieldChange: (field: keyof TextFields, value: string) => void
  disabled?: boolean
}

export const ImageForm: FC<ImageFormProps> = ({
  state,
  onFieldChange,
  disabled = false,
}) => {
  return (
    <>
      <FormGroup>
        <TextField
          label="Title"
          variant="standard"
          value={state.title.value}
          onChange={(event) => onFieldChange('title', event.target.value)}
          disabled={disabled}
        />
      </FormGroup>

      <FormGroup>
        <TextField
          label="Date"
          type="string"
          variant="standard"
          value={state.date.value}
          onChange={(event) => onFieldChange('date', event.target.value)}
          disabled={disabled}
        />
      </FormGroup>

      <FormGroup>
        <TextField
          label="URL Slug"
          variant="standard"
          value={state.slug.value}
          onChange={(event) => onFieldChange('slug', event.target.value)}
          disabled={disabled}
        />
      </FormGroup>

      <FormGroup>
        <TextField
          label="Description"
          variant="standard"
          multiline
          value={state.description.value}
          onChange={(event) => onFieldChange('description', event.target.value)}
          disabled={disabled}
        />
      </FormGroup>
    </>
  )
}
