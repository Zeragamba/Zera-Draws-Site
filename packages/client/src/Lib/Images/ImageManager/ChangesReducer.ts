import { createReducer } from "@reduxjs/toolkit"
import { ImageChangeRecord } from "../ImageChangeRecord"

import * as Actions from "./Actions"

export const changesReducer = createReducer<ImageChangeRecord[]>(
  [],
  ({ addCase }) => {
    addCase(Actions.setImages, () => {
      return []
    })

    addCase(Actions.addImage, (changes, { payload }) => {
      const existing = changes.find((c) => c.id === payload.id)
      changes = changes.filter((c) => c.id !== payload.id)

      switch (existing?.action) {
        case "add":
          // Replace existing add change
          changes.push({ action: "add", ...payload })
          break
        case "edit":
          // Update edit change
          changes.push({ ...existing, ...payload })
          break
        case "remove":
          // Convert removal to edit change
          changes.push({ action: "edit", ...payload })
          break
        default:
          changes.push({ action: "add", ...payload })
      }

      return changes
    })

    addCase(Actions.editImage, (state, { payload }) => {
      const existing = state.find((c) => c.id === payload.id)
      state = state.filter((c) => c.id !== payload.id)

      switch (existing?.action) {
        case "edit":
        case "add":
          // Update existing change
          state.push({ ...existing, ...payload })
          break
        case "remove":
        default:
          state.push({ action: "edit", ...payload })
      }

      return state
    })

    addCase(Actions.removeImage, (state, { payload }) => {
      const existing = state.find((c) => c.id === payload.id)
      state = state.filter((c) => c.id !== payload.id)

      switch (existing?.action) {
        case "add":
          // Removal and add actions cancel each other out
          break
        case "edit":
        case "remove":
        default:
          state.push({ action: "remove", ...payload })
      }

      return state
    })
  },
)
