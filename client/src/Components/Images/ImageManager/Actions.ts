import { createAction } from '@reduxjs/toolkit'

import { ImageData } from '../ImageData'


export type SetImagesPayload = ImageData[]
export const setImages = createAction<SetImagesPayload>('setImages')

export type AddImagePayload = { id: string; filename: string; position?: number; file: File }
export const addImage = createAction<AddImagePayload>('add')

export type EditImagePayload = { id: string; filename?: string; position?: number; file?: File }
export const editImage = createAction<EditImagePayload>('edit')

export type RemoveImagePayload = { id: string }
export const removeImage = createAction<RemoveImagePayload>('remove')
