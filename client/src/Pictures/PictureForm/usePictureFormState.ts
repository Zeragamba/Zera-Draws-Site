import { Reducer, useReducer } from 'react'

import { parseFilename } from '../util'

export type FormField = {
  value: string
  error?: string
  dirty: boolean
}

export type TextFields = {
  title: FormField
  date: FormField
  slug: FormField
  description: FormField
}

export type PictureFormState =
  & { image: File | undefined }
  & TextFields

const defaultState: PictureFormState = {
  image: undefined,
  title: { value: '', dirty: false, error: undefined },
  date: { value: '', dirty: false, error: undefined },
  slug: { value: '', dirty: false, error: undefined },
  description: { value: '', dirty: false, error: undefined },
}

type PictureFormHook = [
  state: PictureFormState,
  dispatch: (action: FormAction) => void
]

type FormAction =
  | { type: 'setImage'; image: File }
  | { type: 'setField'; field: keyof TextFields; value: string }

const formReducer: Reducer<PictureFormState, FormAction> = (state, action) => {
  if (action.type === 'setImage') {
    const image = action.image
    const { title, date } = parseFilename(image.name)

    state = { ...defaultState, image }
    state = formReducer(state, { type: 'setField', field: 'title', value: title })
    state = formReducer(state, { type: 'setField', field: 'date', value: date })
    return state
  }

  if (action.type === 'setField') {
    let field = state[action.field]
    field = { ...field, value: action.value, dirty: true, error: undefined }
    state = { ...state, [action.field]: field }

    if (action.field === 'title' || action.field === 'date') {
      const titleField = state.title
      const slugField = state.slug
      const dateField = state.date

      if (!slugField.dirty) {
        const titleSlug = titleField.value.toLowerCase().replace(/\W+/, '-')
        slugField.value = `${dateField.value}-${titleSlug}`
      }
    }

    return state
  }

  return state
}

export const usePictureFormState = (): PictureFormHook => {
  return useReducer(formReducer, defaultState)
}
