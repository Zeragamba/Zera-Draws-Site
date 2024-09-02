import { createReducer } from "@reduxjs/toolkit"

import * as Actions from "./Actions.ts"
import { reorderItems } from "../../../Hooks/UseSortable.ts"
import { ImageData } from "../../../Models/ImageData.ts"

export const imagesReducer = createReducer<ImageData[]>([], ({ addCase }) => {
  addCase(Actions.setImages, (_images, { payload }) => {
    return payload
  })

  addCase(Actions.addImage, (images, { payload }) => {
    const { id, filename, position = 0, file } = payload

    images.push({
      id: id,
      position: position,
      height: 0,
      width: 0,
      mime_type: "",
      ext: "",
      filename: filename,
      srcs: {
        full: URL.createObjectURL(file),
      },
      file: file,
    })

    return images
  })

  addCase(Actions.editImage, (images, { payload }) => {
    const existing = images.find((i) => i.id === payload.id)
    if (!existing) return images

    if (typeof payload.filename !== "undefined") {
      existing.filename = payload.filename
    }

    if (typeof payload.file !== "undefined") {
      existing.height = 0
      existing.width = 0
      existing.mime_type = ""
      existing.ext = ""
      existing.file = payload.file
      existing.srcs = {
        full: URL.createObjectURL(payload.file),
      }
    }

    if (typeof payload.position !== "undefined") {
      return reorderItems(images, payload.id, payload.position)
    }
  })

  addCase(Actions.removeImage, (images, { payload }) => {
    return images.filter((i) => i.id !== payload.id)
  })
})
