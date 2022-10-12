export type QueryKey = (string | number)[]

const PicturesPrefix: QueryKey = [ 'pictures' ]

export const QueryKeys = {
  pictures: {
    prefix: (): QueryKey => PicturesPrefix,
    getAllPictures: (): QueryKey => [ ...PicturesPrefix, 'all' ],
    getGalleryPictures: (gallery: string): QueryKey => [ ...PicturesPrefix, 'gallery', gallery ],
    getPicture: (pictureId: string): QueryKey => [ ...PicturesPrefix, pictureId ],
    getRecent: (): QueryKey => [ ...PicturesPrefix, 'recent' ],
  },
  user: {
    getCurrentUser: (): QueryKey => [ 'user', 'current' ],
  },
}
