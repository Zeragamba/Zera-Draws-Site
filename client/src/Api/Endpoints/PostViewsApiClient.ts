import { PostData, ViewsData } from '../../Lib'
import { postViewsResSchema } from '../Schemas/PostViewsDataSchema'
import { ServerClient } from '../ServerClient'

class PostViewsApiClient extends ServerClient {
  public async fetchViews(params: {
    postId: PostData['id']
  }): Promise<ViewsData> {
    return this.delete(`/post/${params.postId}/views`, {
      parseData: (data) => postViewsResSchema
        .transform(data => data.views)
        .parse(data),
    })
  }

  async addView(params: {
    viewerId: string
    postId: PostData['id']
  }): Promise<ViewsData> {
    return this.post(`/post/${params.postId}/views`, {
      data: { viewer_id: params.viewerId },
      parseData: (data) => postViewsResSchema
        .transform(data => data.views)
        .parse(data),
    })
  }
}

export const postViewsApiClient = new PostViewsApiClient()
