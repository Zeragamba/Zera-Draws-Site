import { mock } from 'jest-mock-extended'
import crypto from 'node:crypto'

import {
  addImage,
  AddImagePayload,
  editImage,
  EditImagePayload,
  removeImage,
  RemoveImagePayload,
  setImages,
  SetImagesPayload,
} from './Actions'
import { changesReducer } from './ChangesReducer'
import { freeze } from '../../TestHelpers'
import {
  AddImageChangeRecord,
  EditImageChangeRecord,
  ImageChangeRecord,
  RemoveImageChangeRecord,
} from '../ImageApi/ImageChangeRecord'
import { ImageData } from '../ImageData'

describe('ChangesReducer', () => {
  let oldState: ImageChangeRecord[]

  beforeEach(async () => {
    oldState = freeze([])
  })

  describe('Action: SetImages', () => {
    let payload: SetImagesPayload

    beforeEach(async () => {
      payload = [
        { id: crypto.randomUUID(), filename: 'new' } as ImageData,
      ]
    })

    it('clears the list', () => {
      const newState = changesReducer(oldState, setImages(payload))

      expect(newState).toHaveLength(0)
    })
  })

  describe('Action: AddImage', () => {
    let imageId: string
    let payload: AddImagePayload

    beforeEach(async () => {
      imageId = crypto.randomUUID()
      payload = {
        id: imageId,
        file: mock<File>(),
        position: 0,
        filename: 'exampleImage',
      }
    })

    it('inserts an add action record', () => {
      const newState = changesReducer(oldState, addImage(payload))

      expect(newState).toHaveLength(1)
      expect(newState[0].action).toEqual('add')
    })

    describe('when the image was previously added', () => {
      beforeEach(async () => {
        payload.filename = 'updated'

        oldState = changesReducer(oldState, addImage({
          id: imageId,
          filename: 'original',
          position: 0,
          file: mock<File>(),
        }))
      })

      it('updates the add action', () => {
        expect(oldState).toHaveLength(1)

        const oldAddAction = oldState[0] as AddImageChangeRecord
        expect(oldAddAction.action).toEqual('add')
        expect(oldAddAction.id).toEqual(imageId)
        expect(oldAddAction.filename).toEqual('original')

        const newState = changesReducer(oldState, addImage(payload))
        expect(newState).toHaveLength(1)

        const newEditAction = newState[0] as AddImageChangeRecord
        expect(newEditAction.action).toEqual('add')
        expect(newEditAction.id).toEqual(imageId)
        expect(newEditAction.filename).toEqual('updated')
      })
    })

    describe('when the image was previously edited', () => {
      beforeEach(async () => {
        payload.filename = 'updated'
        oldState = changesReducer(oldState, editImage({ id: imageId, filename: 'previous' }))
      })

      it('updates the edit action', () => {
        expect(oldState).toHaveLength(1)

        const oldEditAction = oldState[0] as EditImageChangeRecord
        expect(oldEditAction.action).toEqual('edit')
        expect(oldEditAction.id).toEqual(imageId)
        expect(oldEditAction.filename).toEqual('previous')

        const newState = changesReducer(oldState, addImage(payload))
        expect(newState).toHaveLength(1)

        const newEditAction = newState[0] as EditImageChangeRecord
        expect(newEditAction.action).toEqual('edit')
        expect(newEditAction.id).toEqual(imageId)
        expect(newEditAction.filename).toEqual('updated')
      })
    })

    describe('when the image was previously removed', () => {
      beforeEach(async () => {
        payload.filename = 'updated'
        oldState = changesReducer(oldState, removeImage({ id: imageId }))
      })

      it('converts the remove action to an edit action record', () => {
        expect(oldState).toHaveLength(1)

        const removeAction = oldState[0] as RemoveImageChangeRecord
        expect(removeAction.action).toEqual('remove')
        expect(removeAction.id).toEqual(imageId)

        const newState = changesReducer(oldState, addImage(payload))
        expect(newState).toHaveLength(1)

        const editAction = newState[0] as EditImageChangeRecord
        expect(editAction.action).toEqual('edit')
        expect(editAction.id).toEqual(imageId)
        expect(editAction.filename).toEqual('updated')
      })
    })
  })

  describe('Action: EditImage', () => {
    let imageId: string
    let payload: EditImagePayload

    beforeEach(async () => {
      imageId = crypto.randomUUID()
      payload = { id: imageId, filename: 'updated' }
    })

    it('inserts an edit action record', () => {
      const newState = changesReducer(oldState, editImage(payload))
      expect(newState).toHaveLength(1)

      const editAction = newState[0] as EditImageChangeRecord
      expect(editAction.action).toEqual('edit')
      expect(editAction.id).toEqual(imageId)
      expect(editAction.filename).toEqual('updated')
      expect(editAction.file).toBeUndefined()
      expect(editAction.position).toBeUndefined()
    })

    describe('when the image was previously added', () => {
      beforeEach(async () => {
        oldState = changesReducer(oldState, addImage({
          id: imageId,
          filename: 'original',
          position: 0,
          file: mock<File>(),
        }))
      })

      it('updates the add action', () => {
        expect(oldState).toHaveLength(1)
        const newState = changesReducer(oldState, editImage(payload))
        expect(newState).toHaveLength(1)

        const newEditAction = newState[0] as AddImageChangeRecord
        expect(newEditAction.action).toEqual('add')
        expect(newEditAction.id).toEqual(imageId)
        expect(newEditAction.filename).toEqual('updated')
      })
    })

    describe('when the image was previously edited', () => {
      beforeEach(async () => {
        oldState = changesReducer(oldState, editImage({ id: imageId, filename: 'previous' }))
      })

      it('converts the remove action to an edit action record', () => {
        expect(oldState).toHaveLength(1)
        const newState = changesReducer(oldState, editImage(payload))
        expect(newState).toHaveLength(1)

        const newEditAction = newState[0] as EditImageChangeRecord
        expect(newEditAction.action).toEqual('edit')
        expect(newEditAction.id).toEqual(imageId)
        expect(newEditAction.filename).toEqual('updated')
      })
    })

    describe('when the image was previously removed', () => {
      beforeEach(async () => {
        oldState = changesReducer(oldState, removeImage({ id: imageId }))
      })

      it('converts the remove action to an edit action record', () => {
        expect(oldState).toHaveLength(1)
        const newState = changesReducer(oldState, editImage(payload))
        expect(newState).toHaveLength(1)

        const editAction = newState[0] as EditImageChangeRecord
        expect(editAction.action).toEqual('edit')
        expect(editAction.id).toEqual(imageId)
        expect(editAction.filename).toEqual('updated')
      })
    })
  })

  describe('Action: RemoveImage', () => {
    let imageId: string
    let payload: RemoveImagePayload

    beforeEach(async () => {
      imageId = crypto.randomUUID()
      payload = { id: imageId }
    })

    it('inserts a remove action record', () => {
      const newState = changesReducer(oldState, removeImage(payload))
      expect(newState).toHaveLength(1)

      const editAction = newState[0] as RemoveImageChangeRecord
      expect(editAction.action).toEqual('remove')
      expect(editAction.id).toEqual(imageId)
    })

    describe('when the image was previously added', () => {
      beforeEach(async () => {
        oldState = changesReducer(oldState, addImage({
          id: imageId,
          filename: 'original',
          position: 0,
          file: mock<File>(),
        }))
      })

      it('negates the add record', () => {
        expect(oldState).toHaveLength(1)
        const newState = changesReducer(oldState, removeImage(payload))
        expect(newState).toHaveLength(0)
      })
    })

    describe('when the image was previously edited', () => {
      beforeEach(async () => {
        oldState = changesReducer(oldState, editImage({ id: imageId, filename: 'previous' }))
      })

      it('replaces the edit record', () => {
        expect(oldState).toHaveLength(1)

        const newState = changesReducer(oldState, removeImage(payload))
        expect(newState).toHaveLength(1)

        const newAction = newState[0]
        expect(newAction.action).toEqual('remove')
        expect(newAction.id).toEqual(imageId)
      })
    })

    describe('when the image was previously removed', () => {
      beforeEach(async () => {
        oldState = changesReducer(oldState, removeImage({ id: imageId }))
      })

      it('does not insert a duplicate', () => {
        expect(oldState).toHaveLength(1)

        const newState = changesReducer(oldState, removeImage(payload))
        expect(newState).toHaveLength(1)

        const newAction = newState[0]
        expect(newAction.action).toEqual('remove')
        expect(newAction.id).toEqual(imageId)
      })
    })
  })
})
