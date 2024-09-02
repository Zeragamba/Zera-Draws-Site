import crypto from "node:crypto"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { freeze } from "../../index"
import { ImageData } from "../ImageData"

import {
  addImage,
  AddImagePayload,
  editImage,
  EditImagePayload,
  setImages,
  SetImagesPayload,
} from "./Actions"
import { imagesReducer } from "./ImagesReducer"

describe("ImageReducer", () => {
  let oldState: ImageData[]

  beforeEach(async () => {
    global.URL.createObjectURL = vi.fn()

    oldState = freeze([
      {
        id: crypto.randomUUID(),
        position: 0,
        filename: "firstImage",
        srcs: { full: "https://example.test/firstImage.jpg" },
      },
      {
        id: crypto.randomUUID(),
        position: 1,
        filename: "middleImage",
        srcs: { full: "https://example.test/middleImage.jpg" },
      },
      {
        id: crypto.randomUUID(),
        position: 2,
        filename: "lastImage",
        srcs: { full: "https://example.test/lastImage.jpg" },
      },
    ])
  })

  describe("Action: setImages", () => {
    let payload: SetImagesPayload

    beforeEach(async () => {
      payload = [{ id: crypto.randomUUID(), filename: "new" } as ImageData]
    })

    it("full replaces the list", () => {
      const newState = imagesReducer(oldState, setImages(payload))

      expect(newState).toHaveLength(1)
      expect(newState[0].id).toEqual(payload[0].id)
    })
  })

  describe("Action: addImage", () => {
    let payload: AddImagePayload

    beforeEach(async () => {
      payload = {
        id: crypto.randomUUID(),
        position: 0,
        file: {} as File,
        filename: "exampleImage",
      }
    })

    it("adds the image to the list", () => {
      const newState = imagesReducer(oldState, addImage(payload))

      expect(newState).toHaveLength(oldState.length + 1)
      expect(newState[3].id).toEqual(payload.id)
      expect(newState[3].filename).toEqual(payload.filename)
    })
  })

  describe("Action: editImage", () => {
    let payload: EditImagePayload

    beforeEach(async () => {
      payload = { id: oldState[1].id }
    })

    it("updates the filename", () => {
      payload.filename = "edited"
      const newState = imagesReducer(oldState, editImage(payload))

      expect(newState).toHaveLength(oldState.length)

      expect(newState[0].filename).toEqual("firstImage")
      expect(newState[1].filename).toEqual("edited")
      expect(newState[2].filename).toEqual("lastImage")
    })

    it("updates positions of images", () => {
      payload.position = 2
      const newState = imagesReducer(oldState, editImage(payload))
      const orderedFilenames = [...newState]
        .sort((a, b) => a.position - b.position)
        .map((image) => [image.position, image.filename])

      expect(orderedFilenames).toEqual([
        [0, "firstImage"],
        [1, "lastImage"],
        [2, "middleImage"],
      ])
    })
  })

  describe("Action: removeImage", () => {
    it("removes the image from the list", () => {
      const imageId = crypto.randomUUID()

      const oldState: ImageData[] = []
      const newState = imagesReducer(
        oldState,
        addImage({
          id: imageId,
          position: 0,
          file: {} as File,
          filename: "exampleImage",
        }),
      )

      expect(newState).toHaveLength(1)
    })
  })
})
