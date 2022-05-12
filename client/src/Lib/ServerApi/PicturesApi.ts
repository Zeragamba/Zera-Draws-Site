import { AxiosResponse } from 'axios'
import { useCallback } from 'react'

import { Picture } from './models'
import request from './request'
import { UseApiState, useServerApi } from './useServerApi'

export interface PicturesIndexResponse extends AxiosResponse {
  data: {
    size: number
    pictures: Picture[]
  }
}

export interface PictureResponse extends AxiosResponse {
  data: Picture
}

export const PicturesApi = {
  useAll(): UseApiState<Picture[]> {
    return useServerApi<Picture[]>(useCallback(() => {
      return request('GET', '/pictures')
        .then((res: PicturesIndexResponse) => res.data.pictures)
    }, []))
  },

  fetchPicture(pictureId:string): Promise<Picture> {
    return request('GET', `/pictures/${pictureId}`)
      .then((res: PictureResponse) => res.data)
  },

  useRecent(): UseApiState<Picture[]> {
    return useServerApi<Picture[]>(useCallback(() => {
      return request('GET', '/pictures/recent')
        .then((res: PicturesIndexResponse) => res.data.pictures)
    }, []))
  },

  useTag(tag: string): UseApiState<Picture[]> {
    return useServerApi<Picture[]>(useCallback(() => {
      return request('GET', '/pictures', { params: { tag } })
        .then((res: PicturesIndexResponse) => res.data.pictures)
    }, [tag]))
  },
}
