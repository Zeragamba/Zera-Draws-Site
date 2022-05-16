import { Tag } from '../TagsApi'

export type TagsState = {
  tags: Tag[]
  fetching: boolean
}

export const defaultTagsState = {
  tags: [],
  fetching: false,
}
