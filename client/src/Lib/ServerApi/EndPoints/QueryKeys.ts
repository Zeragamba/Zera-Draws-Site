export type QueryKey = (string | number)[]

const PostsPrefix: QueryKey = [ 'posts' ]

export const QueryKeys = {
  posts: {
    prefix: (): QueryKey => PostsPrefix,
    getAllPosts: (): QueryKey => [ ...PostsPrefix, 'all' ],
    getGalleryPosts: (gallery: string): QueryKey => [ ...PostsPrefix, 'gallery', gallery ],
    getPost: (PostId: string): QueryKey => [ ...PostsPrefix, PostId ],
    getRecent: (): QueryKey => [ ...PostsPrefix, 'recent' ],
  },
  user: {
    getCurrentUser: (): QueryKey => [ 'user', 'current' ],
  },
}
