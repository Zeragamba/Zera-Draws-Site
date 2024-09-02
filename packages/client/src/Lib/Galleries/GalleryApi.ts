import { GalleryResSchema } from "./GalleryDataSchema"
import { ServerApi } from "../ServerApi"
import { GalleryData } from "./GalleryData"
import { PagedPostData, PagedPostDataResSchema } from "../Posts"

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
