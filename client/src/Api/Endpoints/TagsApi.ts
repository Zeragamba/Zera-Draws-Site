import { EditableTagData, TagData } from '../../Lib'
import { TagListResSchema, TagResSchema } from '../Schemas'
import { ServerApi } from '../ServerApi'

export class TagsApi extends ServerApi {
  async createTag(params: {
    tag: EditableTagData
  }): Promise<TagData> {
    return this.post('/tags', {
      data: params,
      parseData: data => TagResSchema.parse(data),
    })
  }

  async deleteTag(params: {
    tagId: TagData['id']
  }): Promise<TagData> {
    return this.delete(`/tags/${params.tagId}`, {
      parseData: data => TagResSchema.parse(data),
    })
  }

  async deleteEmptyTags(): Promise<TagData[]> {
    return this.delete('/tags/empty', {
      parseData: data => TagListResSchema.parse(data),
    })
  }

  async updateTag(params: {
    tagId: TagData['id']
    tag: Partial<EditableTagData>
  }): Promise<TagData> {
    return this.patch(`/tags/${params.tagId}`, {
      data: { tag: params.tag },
      parseData: data => TagResSchema.parse(data),
    })
  }

  async fetchAllTags(): Promise<TagData[]> {
    return this.get('/tags', {
      parseData: data => TagListResSchema.parse(data),
    })
  }

  async fetchTag(params: {
    tagId: TagData['id']
  }): Promise<TagData> {
    return this.get(`/tags/${params.tagId}`, {
      parseData: data => TagResSchema.parse(data),
    })
  }

  async mergeTags(params: {
    srcTagId: TagData['id']
    destTagId: TagData['id']
  }): Promise<TagData> {
    return this.post(`/tag/${params.srcTagId}/merge/${params.destTagId}`, {
      parseData: data => TagResSchema.parse(data),
    })
  }
}

export const tagsApi = new TagsApi()
