import { createAction, createReducer, Dispatch } from '@reduxjs/toolkit'
import { format as formatDate } from 'date-fns'
import { useReducer } from 'react'

import { formatSlug, parseFilename } from '../../Lib/FilenameUtils'

export type ImageFormState =
  { image: File | undefined }
  & TextFields

export type TextFields = {
  title: FormField
  date: FormField
  slug: FormField
  description: FormField
}

type FormField = {
  value: string
  error?: string
  dirty: boolean
}

const defaultState: ImageFormState = {
  image: undefined,
  title: { value: '', dirty: false, error: undefined },
  date: { value: formatDate(new Date(), 'yyyy-MM-dd'), dirty: false, error: undefined },
  slug: { value: '', dirty: false, error: undefined },
  description: { value: '', dirty: false, error: undefined },
}

export const imageChanged = createAction('image/changed', (image: File) => {
  return { payload: { image } }
})

export const fieldChanged = createAction('field/changed', (field: keyof TextFields, value: string) => {
  return { payload: { field, value } }
})

const imageFormReducer = createReducer(defaultState, ({ addCase }) => {
  addCase(imageChanged, (state, action) => {
    const { image } = action.payload
    const { title, date } = parseFilename(image.name)

    state = { ...defaultState, image }
    state = imageFormReducer(state, fieldChanged('title', title))
    state = imageFormReducer(state, fieldChanged('date', date))
    return state
  })

  addCase(fieldChanged, (state, action) => {
    const { field: fieldName, value } = action.payload

    const field = state[fieldName]
    field.value = value
    field.dirty = true
    field.error = undefined

    if (fieldName === 'title' || fieldName === 'date') {
      const titleField = state.title
      const slugField = state.slug
      const dateField = state.date

      if (!slugField.dirty) {
        slugField.value = formatSlug(`${dateField.value}-${titleField.value}`)
      }
    }

    return state
  })
})

export type ImageFormHook = [ state: ImageFormState, dispatch: Dispatch ]
export const useImageFormState = (): ImageFormHook => {
  const [ state, dispatch ] = useReducer(imageFormReducer, defaultState)
  return [ state, dispatch as Dispatch ]
}
