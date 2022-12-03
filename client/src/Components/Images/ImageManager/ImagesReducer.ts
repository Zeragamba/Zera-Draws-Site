import { createReducer } from '@reduxjs/toolkit'

import { Image } from '../../../Lib/ServerApi'
import * as Actions from './Actions'

export const imagesReducer = createReducer<Image[]>([], ({ addCase }) => {
  addCase(Actions.setImages, (images, { payload }) => {
    return payload
  })

  addCase(Actions.addImage, (images, { payload }) => {
    const { id, filename, order = 0, file } = payload

    images.push({
      id: id,
      order: order,
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

    if (payload.filename) {
      existing.filename = payload.filename
    }

    if (payload.order) {
      existing.order = payload.order
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
