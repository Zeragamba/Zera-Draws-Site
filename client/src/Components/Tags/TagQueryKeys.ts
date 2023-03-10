import { createQueryKeys } from '@lukemorales/query-key-factory'

import { getTag } from './TagsApi'

export const tagQueryKeys = createQueryKeys('tags', {
  get: (tag: string) => ({
    queryKey: [ tag ],
    queryFn: () => getTag({ tag }),
    contextQueries: {
      posts: {
        queryKey: null,
      },
    },
  }),
})
