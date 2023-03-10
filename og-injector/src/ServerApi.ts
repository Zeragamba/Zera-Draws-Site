import axios, { AxiosRequestConfig, Method } from 'axios'
import { SERVER_URL } from '../config'
import { PostData } from './models/PostData'

const apiClient = axios.create({
  baseURL: SERVER_URL,
})

function request<Res>(method: Method, path: string, config: AxiosRequestConfig = {}): Promise<Res> {
  return apiClient.request<Res>({ method, url: path, ...config })
    .then(res => res.data)
}

export function getPost(postId: string): Promise<PostData> {
  type Response = { post: PostData }

  return request<Response>('GET', `/post/${postId}`)
    .then(res => res.post)
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

