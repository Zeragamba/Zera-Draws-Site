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
    inGallery: (params: { galleryId: GalleryData['id'] }) => ({
      queryKey: [ params ],
      contextQueries: {
        data: null,
      },
    }),
    withTag: (params: { tagId: TagData['id'] }) => ({
      queryKey: [ params ],
      contextQueries: {
        data: null,
      },
    }),
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
  images: {
    get: (params: { src: string }) => ({
      queryKey: [ params ],
    }),
  },
  metrics: {
    postViews: null,
  },
  siteMeta: {
    features: null,
    content: null,
    socials: null,
  },
})
