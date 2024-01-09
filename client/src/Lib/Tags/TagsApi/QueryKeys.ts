import { QueryClient } from '@tanstack/react-query'

import { getAllTags } from './GetAllTags'
import { setTagCache } from './GetTag'

const namespace = 'tags'

export const TagQueryKeys = {
  namespace,
  getAllTags: (queryClient: QueryClient) => ({
    queryKey: [ 'tags', 'all' ],
    queryFn: async () => {
      const tags = await getAllTags()
      tags.forEach(tag => setTagCache(queryClient, tag))
      return tags
    },
  }),
  getTag: (id: string) => [ 'tags', { id } ],
}
