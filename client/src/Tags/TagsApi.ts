import { AxiosResponse } from 'axios'

import { ServerApi } from '../Lib/ServerApi'

export type Tag = {
  id: string
  name: string
}

export interface GetTagsResponse extends AxiosResponse {
  data: {
    tags: Tag[]
  }
}

export const TagsApi = {
  async getTags(): Promise<Tag[]> {
    return ServerApi.request<GetTagsResponse>('GET', '/tags')
      .then(res => res.data.tags)
  },
}
