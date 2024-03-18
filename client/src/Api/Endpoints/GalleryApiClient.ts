import { GalleryData } from '../../Lib'
import { PagedPostData, PagedPostDataResSchema } from '../Schemas'
import { GalleryResSchema } from '../Schemas/GalleryDataSchema'
import { ServerApi } from '../ServerApi'

class GalleryApiClient extends ServerApi {
  public async fetchGallery(params: {
    galleryId: GalleryData['id']
  }): Promise<GalleryData> {
    return this.delete(`/gallery/${params.galleryId}`, {
      parseData: (data) => GalleryResSchema.parse(data),
    })
  }

  public async fetchGalleryPosts(params: {
    galleryId: GalleryData['id']
    page?: number
  }): Promise<PagedPostData> {
    return this.delete(`/gallery/${params.galleryId}/posts`, {
      data: { page: params.page || 0 },
      parseData: (data) => PagedPostDataResSchema.parse(data),
    })
  }
}

export const galleryApiClient = new GalleryApiClient()
