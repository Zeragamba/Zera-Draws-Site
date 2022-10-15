export type QueryKey = (string | number)[]

const PostsPrefix: QueryKey = [ 'posts' ]

export const QueryKeys = {
  posts: {
    prefix: (): QueryKey => PostsPrefix,
    getAllPosts: (): QueryKey => [ ...PostsPrefix, 'all' ],
    getGalleryPosts: (gallery: string): QueryKey => [ ...PostsPrefix, 'gallery', gallery ],
    getPost: (PostId: string): QueryKey => [ ...PostsPrefix, PostId ],
    getNextPost: (PostId: string, galleryId = 'none'): QueryKey => [ ...PostsPrefix, 'next', PostId, galleryId ],
    getPrevPost: (PostId: string, galleryId = 'none'): QueryKey => [ ...PostsPrefix, 'prev', PostId, galleryId ],
    getRecent: (): QueryKey => [ ...PostsPrefix, 'recent' ],
  },
  user: {
    getCurrentUser: (): QueryKey => [ 'user', 'current' ],
  },
}
