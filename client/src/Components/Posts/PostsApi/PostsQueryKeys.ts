import { createQueryKeys } from '@lukemorales/query-key-factory'

import { ViewsApi } from '../../Views/ViewsApi'

type NextPostParams = { gallery?: string; tag?: string }
type PrevPostParams = { gallery?: string; tag?: string }

export const postsQueryKeys = createQueryKeys('posts', {
  all: null,
  recent: null,
  latest: null,
  first: null,
  get: (postId: string) => ({
    queryKey: [ postId ],
    contextQueries: {
      next: (params: NextPostParams) => [ params ],
      prev: (params: PrevPostParams) => [ params ],
      views: {
        queryKey: null,
        queryFn: () => ViewsApi.postViews({ postId }),
      },
    },
  }),
})
