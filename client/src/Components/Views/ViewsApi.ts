import { ViewsData } from './ViewsData'
import { ModelResponse, ServerClient } from '../../Lib/ServerApi'
import { PostData } from '../Posts/PostData'

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
