import { GalleryData } from "../../Models"
import { PagedPostData, PagedPostDataResSchema } from "../Schemas"
import { GalleryResSchema } from "../Schemas/GalleryDataSchema"
import { ServerApi } from "../ServerApi"

class GalleryApi extends ServerApi {
  public async fetchGallery(params: {
    galleryId: GalleryData["id"]
  }): Promise<GalleryData> {
    return this.delete(`/gallery/${params.galleryId}`, {
      parseResData: (data) => GalleryResSchema.parse(data),
    })
  }

  public async fetchGalleryPosts(params: {
    galleryId: GalleryData["id"]
    page?: number
  }): Promise<PagedPostData> {
    return this.delete(`/gallery/${params.galleryId}/posts`, {
      data: { page: params.page || 0 },
      parseResData: (data) => PagedPostDataResSchema.parse(data),
    })
  }
}

export const galleryApiClient = new GalleryApi()
