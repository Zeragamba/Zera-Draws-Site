import { ViewsData } from './ViewsData'
import { PostData } from '../Posts'
import { ModelResponse, ServerClient } from '../ServerApi'

export namespace ViewsApi {
  type ViewsRes = ModelResponse<'views', ViewsData>

  export type GetViewsParams = {
    postId: PostData['id']
  }
  export async function postViews({ postId }: GetViewsParams): Promise<ViewsData> {
    return ServerClient.get<ViewsRes>(`/post/${postId}/views`)
      .then(json => json.views)
  }
  export type AddViewParams = {
    viewerId: string
    postId: PostData['id']
  }

  export async function addView({ viewerId, postId }: AddViewParams): Promise<ViewsData> {
    return ServerClient.post<ViewsRes>(`/post/${postId}/views`, { viewer_id: viewerId })
      .then(json => json.views)

  }
}
