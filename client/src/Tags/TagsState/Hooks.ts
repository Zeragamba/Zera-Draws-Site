import { useAppSelector } from '../../App/AppState'
import { Tag } from '../TagsApi'
import { TagsState } from './TagsState'

const useTagsState = (): TagsState => {
  return useAppSelector(state => state.tags)
}

export const useTags = (): Tag[] => {
  return useTagsState().tags
}
