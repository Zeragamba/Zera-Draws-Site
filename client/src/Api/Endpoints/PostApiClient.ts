import { AxiosProgressEvent } from 'axios'

import { EditableImage, EditablePost, getPostUrl, ImageChangeRecord, PostData, postToFormData } from '../../Lib'
import { PagedPostData, PagedPostDataResSchema, PostDataResSchema } from '../Schemas'
import { ServerClient } from '../ServerClient'

class PostApiClient extends ServerClient {
  public async deletePost(params: {
    postId: PostData['id']
  }): Promise<PostData> {
    return this.delete(`/post/${params.postId}`, {
      parseData: (data) => PostDataResSchema.parse(data),
    })
  }

  public async createPost(params: {
    post: EditablePost
    images: EditableImage[]
    onUploadProgress: (progress: number) => void
  }): Promise<PostData> {
    return this.post('/posts', {
      data: postToFormData({
        post: params.post, images: params.images,
      }),
      onUploadProgress: (event: AxiosProgressEvent) => {
        if (!params.onUploadProgress) return
        const progress = event.progress || 0
        params.onUploadProgress(progress * 100)
      },
      parseData: (data) => PostDataResSchema.parse(data),
    })
  }

  public async updatePost(params: {
    postId: PostData['id']
    post?: Partial<EditablePost>
    changes?: ImageChangeRecord[]
    onUploadProgress: (progress: number) => void
  }): Promise<PostData> {
    return this.patch(`/post/${params.postId}`, {
      data: postToFormData({
        post: params.post, changes: params.changes,
      }),
      onUploadProgress: (event: AxiosProgressEvent) => {
        if (!params.onUploadProgress) return
        const progress = event.progress || 0
        params.onUploadProgress(progress * 100)
      },
      parseData: (data) => PostDataResSchema.parse(data),
    })
  }

  public async fetchPosts(params?: {
    page?: number
  }): Promise<PagedPostData> {
    return this.get('/posts', {
      params: { page: params?.page || 1 },
      parseData: (data) => PagedPostDataResSchema.parse(data),
    })
  }

  public async fetchGalleryPosts(params: {
    galleryId: string
    page?: number
  }): Promise<PagedPostData> {
    return this.get(`/gallery/${params.galleryId}/posts`, {
      params: { page: params.page || 1 },
      parseData: (data) => PagedPostDataResSchema.parse(data),
    })
  }

  public async fetchTaggedPosts(params: {
    tagId: string
    page?: number
  }): Promise<PagedPostData> {
    return this.get(`/tag/${params.tagId}/posts`, {
      params: { page: params.page || 1 },
      parseData: (data) => PagedPostDataResSchema.parse(data),
    })
  }

  public async fetchRecentPosts(params?: {
    page?: number
  }): Promise<PagedPostData> {
    return this.get('/posts/recent', {
      params: { page: params?.page || 1 },
      parseData: (data) => PagedPostDataResSchema.parse(data),
    })
  }

  public async fetchPost(params: {
    postId: string
    galleryId?: string
    tagId?: string
  }): Promise<PostData> {
    return this.get(`/post/${params.postId}`, {
      parseData: (data) => PostDataResSchema.parse(data),
    })
  }

  public async fetchFirstPost(): Promise<PostData> {
    return this.get('/post/first', {
      parseData: (data) => PostDataResSchema.parse(data),
    })
  }

  public async fetchLatestPost(): Promise<PostData> {
    return this.get('/post/latest', {
      parseData: (data) => PostDataResSchema.parse(data),
    })
  }

  public async fetchNextPost(params: {
    postId: string
    galleryId?: string
    tagId?: string
  }): Promise<PostData> {
    const url = getPostUrl({
      postId: params.postId, galleryId: params.galleryId, tagId: params.tagId,
    })

    return this.get(`${url}/next`, {
      parseData: (data) => PostDataResSchema.parse(data),
    })
  }

  public async fetchPrevPost(params: {
    postId: string
    galleryId?: string
    tagId?: string
  }): Promise<PostData> {
    const url = getPostUrl({
      postId: params.postId, galleryId: params.galleryId, tagId: params.tagId,
    })

    return this.get(`${url}/prev`, {
      parseData: (data) => PostDataResSchema.parse(data),
    })
  }
}

export const postApiClient = new PostApiClient()
