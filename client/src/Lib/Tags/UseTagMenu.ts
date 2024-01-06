import { sortArray, sortBy } from 'dyna-sort'
import { useState } from 'react'

import { TagData } from '../../Components/Tags/TagData'
import { filterTags, TagFilter } from '../../Components/Tags/TagFilter'
import { useAllTags$ } from '../../Components/Tags/TagsApi'
import { byFeatured, byTagName } from '../../Components/Tags/TagSorters'

export type UseTagMenuReturn = {
  isPending: boolean
  filterText: string
  setFilterText: (text: string) => void
  allTags: TagData[]
  activeTags: TagData[]
  filteredTags: TagData[]
}

export function useTagMenu(): UseTagMenuReturn {
  const allTags$ = useAllTags$()
  const [ filterText, setFilterText ] = useState<string>('')

  const allTags = allTags$.data || []
  const activeTags = allTags.filter(tag => tag.num_posts >= 1) ?? []

  const tagFilter: TagFilter = {}
  const numFeatured = activeTags.filter((tag) => tag.featured).length

  if (filterText) {
    tagFilter.name = filterText
  } else if (numFeatured >= 1) {
    tagFilter.featured = true
  }

  const filteredTags = sortArray(filterTags(activeTags, tagFilter), sortBy(byFeatured, byTagName))

  return {
    isPending: allTags$.isPending,
    filterText,
    setFilterText,
    allTags,
    activeTags,
    filteredTags,
  }
}