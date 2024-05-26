import axios, { AxiosRequestConfig, Method } from 'axios'
import { SERVER_URL } from '../config'
import { PostData } from './models/PostData'
import { logger } from './Logger'
import { TagData } from './models/TagData'

const apiClient = axios.create({
  baseURL: SERVER_URL,
})

function request<Res>(method: Method, path: string, config: AxiosRequestConfig = {}): Promise<Res> {
  logger.info(`ServerAPI: ${method} ${SERVER_URL}${path}`)

  return apiClient.request<Res>({ method, url: path, ...config })
    .then(res => res.data)
}

export function getPost(postId: string): Promise<PostData> {
  type Response = { post: PostData }

  return request<Response>('GET', `/post/${postId}`)
    .then(res => res.post)
}

export function getTag(tagId: string): Promise<TagData> {
  type Response = { tag: TagData }

  return request<Response>('GET', `/tag/${tagId}`)
    .then(res => res.tag)
}

export function getTaggedPosts(tagId: string): Promise<PostData[]> {
  type Response = { posts: PostData[] }

  return request<Response>('GET', `/tag/${tagId}/posts`)
    .then(res => res.posts)
}

export function getFirstPost(): Promise<PostData> {
  type Response = { post: PostData }

  return request<Response>('GET', `/post/first`)
    .then(res => res.post)
}

export function getLatestPost(): Promise<PostData> {
  type Response = { post: PostData }

  return request<Response>('GET', `/post/latest`)
    .then(res => res.post)
}
