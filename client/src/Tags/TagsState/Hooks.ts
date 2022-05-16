import { useAppState } from '../../App/AppProvider'
import { Tag } from '../TagsApi'
import { TagsState } from './TagsState'

const useTagsState = (): TagsState => {
  const { tags } = useAppState()
  return tags
}

export const useTags = (): Tag[] => {
  return useTagsState().tags
}
