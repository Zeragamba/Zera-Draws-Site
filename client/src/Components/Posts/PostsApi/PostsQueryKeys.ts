import { QueryKey } from '@tanstack/react-query'

const namespace = [ 'posts' ]
export const postsQueryKeys = {
  namespace: namespace,
  getAllPosts: (): QueryKey => [ ...namespace, 'all' ],
  getGalleryPosts: (gallery: string): QueryKey => [ ...namespace, 'gallery', gallery ],
  getTaggedPosts: (tag: string): QueryKey => [ ...namespace, 'tagged', tag ],
  getPost: (PostId: string): QueryKey => [ ...namespace, PostId ],
  getNextPost: (PostId: string, galleryId = 'none'): QueryKey => [ ...namespace, 'next', PostId, galleryId ],
  getPrevPost: (PostId: string, galleryId = 'none'): QueryKey => [ ...namespace, 'prev', PostId, galleryId ],
  getRecent: (): QueryKey => [ ...namespace, 'recent' ],
}
