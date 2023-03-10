import { createReducer } from '@reduxjs/toolkit'

import * as Actions from './Actions'
import { ImageData } from '../ImageData'

export const imagesReducer = createReducer<ImageData[]>([], ({ addCase }) => {
  addCase(Actions.setImages, (images, { payload }) => {
    return payload
  })

  addCase(Actions.addImage, (images, { payload }) => {
    const { id, filename, position = 0, file } = payload

    images.push({
      id: id,
      position: position,
      height: 0,
      width: 0,
      mime_type: '',
      ext: '',
      filename: filename,
      srcs: {
        full: URL.createObjectURL(file),
      },
      file: file,
    })

    return images
  })

  addCase(Actions.editImage, (images, { payload }) => {
    const existing = images.find(i => i.id === payload.id)
    if (!existing) return images

    if (typeof payload.filename !== 'undefined') {
      existing.filename = payload.filename
    }

    if (typeof payload.position !== 'undefined') {
      existing.position = payload.position
    }

    if (payload.file) {
      existing.height = 0
      existing.width = 0
      existing.mime_type = ''
      existing.ext = ''
      existing.file = payload.file
      existing.srcs = {
        full: URL.createObjectURL(payload.file),
      }
    }
  })

  addCase(Actions.removeImage, (images, { payload }) => {
    return images.filter(i => i.id !== payload.id)
  })
})
