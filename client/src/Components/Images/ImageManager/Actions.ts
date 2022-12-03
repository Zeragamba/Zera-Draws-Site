import { createAction } from '@reduxjs/toolkit'

import { Image } from '../../../Lib/ServerApi'

export type SetImagesPayload = Image[]
export const setImages = createAction<SetImagesPayload>('setImages')

export type AddImagePayload = { id: string; filename: string; order?: number; file: File }
export const addImage = createAction<AddImagePayload>('add')

export type EditImagePayload = { id: string; filename?: string; order?: number; file?: File }
export const editImage = createAction<EditImagePayload>('edit')

export type RemoveImagePayload = { id: string }
export const removeImage = createAction<RemoveImagePayload>('remove')
