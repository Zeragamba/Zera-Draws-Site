import { AnyAction, createAction, createReducer } from '@reduxjs/toolkit'
import { Dispatch, useReducer } from 'react'

import { ImageChangePayload } from '../../../Lib/ServerApi/EndPoints/Posts/EditPost'

type AddImagePayload = { id: string; filename: string; order?: number; file: File }
export const addImage = createAction<AddImagePayload>('add')

type EditImagePayload = { id: string; filename?: string; order?: number; file?: File }
export const editImage = createAction<EditImagePayload>('edit')

type RemoveImagePayload = { id: string }
export const removeImage = createAction<RemoveImagePayload>('remove')

const reducer = createReducer<ImageChangePayload[]>([], ({ addCase }) => {
  addCase(addImage, (state, { payload }) => {
    const existing = state.find(c => c.id === payload.id)
    state = state.filter(c => c.id !== payload.id)

    switch (existing?.action) {
      case 'add':
        // Replace existing add change
        state.push({ action: 'add', ...payload })
        break
      case 'edit':
        // Update edit change
        state.push({ ...existing, ...payload })
        break
      case 'remove':
        // Convert removal to edit change
        state.push({ action: 'edit', ...payload })
        break
      default:
        state.push({ action: 'add', ...payload })
    }

    return state
  })

  addCase(editImage, (state, { payload }) => {
    const existing = state.find(c => c.id === payload.id)
    state = state.filter(c => c.id !== payload.id)

    switch (existing?.action) {
      case 'edit':
        // Update existing edit change
        state.push({ ...existing, ...payload })
        break
      case 'add':
      case 'remove':
      default:
        state.push({ action: 'edit', ...payload })
    }

    return state
  })

  addCase(removeImage, (state, { payload }) => {
    const existing = state.find(c => c.id === payload.id)
    state = state.filter(c => c.id !== payload.id)

    switch (existing?.action) {
      case 'add':
        // Removal and add actions cancel each other out
        break
      case 'edit':
      case 'remove':
      default:
        state.push({ action: 'remove', ...payload })
    }

    return state
  })
})

export function useImageChanges(): [ changes: ImageChangePayload[], addChange: Dispatch<AnyAction> ] {
  return useReducer(reducer, [])
}
