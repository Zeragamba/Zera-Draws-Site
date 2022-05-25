import { createAction } from '@reduxjs/toolkit'

import { Tag } from '../../Tags/TagsApi'

export const tagsFetchStart = createAction('TAG.FETCH.START')
export const tagsFetchComplete = createAction('TAG.FETCH.COMPLETE')
export const tagsFetchError = createAction('TAG.FETCH.ERROR', (error: unknown) => {
  return { payload: { error } }
})

export const setTags = createAction('TAG.SET', (tags: Tag[]) => {
  return { payload: tags }
})
