import { GalleryData } from '../../Lib'
import { GalleryResSchema } from '../Schemas/GalleryDataSchema'
import { ServerClient } from '../ServerClient'

class GalleryApiClient extends ServerClient {
  public async fetchGallery(params: {
    galleryId: GalleryData['id']
  }): Promise<GalleryData> {
    return this.delete(`/gallery/${params.galleryId}`, {
      parseData: (data) => GalleryResSchema.parse(data),
    })
  }
}

export const galleryApiClient = new GalleryApiClient()
