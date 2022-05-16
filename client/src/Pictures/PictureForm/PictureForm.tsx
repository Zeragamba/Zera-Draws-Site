import { ChangeEvent, FC } from 'react'

import { TextFields } from './usePictureFormState'

type PictureFormProps =
  TextFields
  & {
    onFieldChange: (string: keyof TextFields, value: string) => void

    tags: string[]
    onTagsChange: (tags: string[]) => void
  }

export const PictureForm: FC<PictureFormProps> = ({
  title,
  date,
  slug,
  description,
  tags,

  onFieldChange,
  onTagsChange,
}) => {
  const handleFormChange = (field: keyof TextFields) => {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onFieldChange(field, event.target.value)
    }
  }

  return (
    <>
      <div>
        <label>
          Title
          <input
            type="text"
            value={title.value}
            onChange={handleFormChange('title')}
            style={{ display: 'block' }}
          />
        </label>
      </div>

      <div>
        <label>
          Date
          <input
            type="date"
            value={date.value}
            onChange={handleFormChange('date')}
            style={{ display: 'block' }}
          />
        </label>
      </div>

      <div>
        <label>
          URL Slug
          <input
            type="text"
            value={slug.value}
            onChange={handleFormChange('slug')}
            style={{ display: 'block' }}
          />
        </label>
      </div>

      <div>
        <label>
          Description
          <textarea
            onChange={handleFormChange('description')}
            style={{ display: 'block' }}
            value={description.value}
          />
        </label>
      </div>

      <div>
        <label>
          Tags
          <textarea
            onChange={handleFormChange('description')}
            style={{ display: 'block' }}
            value={description.value}
          />
        </label>
      </div>
    </>
  )
}
