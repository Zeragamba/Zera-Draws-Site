import { createAction } from '@reduxjs/toolkit'

import { Tag } from '../TagsApi'

export const tagsFetchStart = createAction('TAG.FETCH.START')

export const tagsFetchComplete = createAction('TAG.FETCH.COMPLETE', (tags: Tag[]) => {
  return { payload: tags }
})

export const setTags = createAction('TAG.SET', (tags: Tag[]) => {
  return { payload: tags }
})
