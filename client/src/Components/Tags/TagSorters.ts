import { createSorter } from 'dyna-sort'

import { TagData } from './TagData'

export const byTagName = createSorter<TagData>((a, b) => a.name.localeCompare(b.name))
