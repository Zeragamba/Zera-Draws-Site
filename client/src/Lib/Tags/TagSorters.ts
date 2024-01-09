import { createSorter } from 'dyna-sort'

import { TagData } from './TagData'

export const byTagName = createSorter<TagData>((a, b) => a.name.localeCompare(b.name))
export const byFeatured = createSorter<TagData>((a, b) => {
  if (a.featured && b.featured) return 0
  if (a.featured) return 1
  if (b.featured) return -1
  return 0
})
