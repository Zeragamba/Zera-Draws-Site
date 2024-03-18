import { createQueryKeyStore } from '@lukemorales/query-key-factory'

import { GalleryData, TagData } from '../Lib'

export const queryKeys = createQueryKeyStore({
  auth: {
    currentUser: null,
  },
  tags: {
    all: null,
    forTag: (params: { tagId: TagData['id'] | null }) => ({
      queryKey: [ params ],
      contextQueries: {
        data: null,
      },
    }),
  },
  galleries: {
    forGallery: (params: { galleryId: GalleryData['id'] | null }) => ({
      queryKey: [ params ],
      contextQueries: {
        data: null,
      },
    }),
  },
  posts: {
    all: null,
    first: null,
    latest: null,
    recent: null,
    forPost: (params: { postId: string | null; galleryId?: string | null; tagId?: string | null }) => ({
      queryKey: [ params ],
      contextQueries: {
        data: null,
        next: null,
        prev: null,
        views: null,
      },
    }),
  },
  metrics: {
    postViews: null,
  },
})
