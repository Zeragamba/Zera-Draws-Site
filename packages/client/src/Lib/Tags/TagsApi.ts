import { ServerApi } from "../../Api"
import { EditableTagData, TagData } from "./TagData"
import { TagListResSchema, TagResSchema } from "./TagDataSchema"

export class TagsApi extends ServerApi {
  async createTag(params: { tag: EditableTagData }): Promise<TagData> {
    return this.post("/tags", {
      data: params,
      parseResData: (data) => TagResSchema.parse(data),
    })
  }

  async deleteTag(params: { tagId: TagData["id"] }): Promise<TagData> {
    return this.delete(`/tags/${params.tagId}`, {
      parseResData: (data) => TagResSchema.parse(data),
    })
  }

  async deleteEmptyTags(): Promise<TagData[]> {
    return this.delete("/tags/empty", {
      parseResData: (data) => TagListResSchema.parse(data),
    })
  }

  async updateTag(params: {
    tagId: TagData["id"]
    tag: Partial<EditableTagData>
  }): Promise<TagData> {
    return this.patch(`/tag/${params.tagId}`, {
      data: { tag: params.tag },
      parseResData: (data) => TagResSchema.parse(data),
    })
  }

  async fetchAllTags(): Promise<TagData[]> {
    return this.get("/tags", {
      parseResData: (data) => TagListResSchema.parse(data),
    })
  }

  async fetchTag(params: { tagId: TagData["id"] }): Promise<TagData> {
    return this.get(`/tag/${params.tagId}`, {
      parseResData: (data) => TagResSchema.parse(data),
    })
  }

  async mergeTags(params: {
    srcTagId: TagData["id"]
    destTagId: TagData["id"]
  }): Promise<TagData> {
    return this.post(`/tag/${params.srcTagId}/merge_into/${params.destTagId}`, {
      parseResData: (data) => TagResSchema.parse(data),
    })
  }
}

export const tagsApi = new TagsApi()
