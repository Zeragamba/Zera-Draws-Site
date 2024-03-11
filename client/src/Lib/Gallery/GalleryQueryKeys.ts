import { createQueryKeys } from '@lukemorales/query-key-factory'

export const galleryQueryKeys = createQueryKeys('gallery', {
  get: (galleryId?: string) => ({
    queryKey: [ galleryId ],
    contextQueries: {
      posts: null,
    },
  }),
})
