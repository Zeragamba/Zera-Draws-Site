import { useState } from "react"
import { sort } from "fast-sort"
import { TagData } from "./TagData"
import { useAllTags$ } from "./TagQueries"
import { filterTags, TagFilter } from "./TagFilter"
import { byIsFeatured, byTagName } from "./TagSorters"

export type UseTagMenuReturn = {
  isPending: boolean
  filterText: string
  setFilterText: (text: string) => void
  allTags: TagData[]
  activeTags: TagData[]
  filteredTags: TagData[]
}

export function useTagMenuCtrl(): UseTagMenuReturn {
  const allTags$ = useAllTags$()
  const [filterText, setFilterText] = useState<string>("")

  const allTags = allTags$.data || []
  const activeTags = allTags.filter((tag) => tag.num_posts >= 1) ?? []

  const tagFilter: TagFilter = {}
  const numFeatured = activeTags.filter((tag) => tag.featured).length

  if (filterText) {
    tagFilter.name = filterText
  } else if (numFeatured >= 1) {
    tagFilter.featured = true
  }

  const filteredTags = sort(filterTags(activeTags, tagFilter)).by([
    { asc: byIsFeatured },
    { asc: byTagName },
  ])

  return {
    isPending: allTags$.isPending,
    filterText,
    setFilterText,
    allTags,
    activeTags,
    filteredTags,
  }
}
