import { createQueryKeys } from '@lukemorales/query-key-factory'

import { getTag } from './TagsApi'

export const tagQueryKeys = createQueryKeys('tags', {
  get: (tagId?: string) => ({
    queryKey: [ tagId ],
    queryFn: () => getTag({ tagId }),
    contextQueries: {
      posts: {
        queryKey: null,
      },
    },
  }),
})
