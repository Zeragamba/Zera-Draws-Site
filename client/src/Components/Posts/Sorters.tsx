import { createSorter } from 'dyna-sort'

import { PostData } from './PostData'

export const byPosition = createSorter<PostData>((a, b) => a.position - b.position)
