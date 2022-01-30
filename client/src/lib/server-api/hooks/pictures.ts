import { useCallback } from 'react';
import { AxiosResponse } from 'axios';

import request from '../request';
import { UseApiState, useServerApi } from './use-server-api';
import { Picture } from '../models';

export interface PicturesIndexResponse extends AxiosResponse {
  data: {
    size: number;
    pictures: Picture[];
  };
}

export interface PictureResponse extends AxiosResponse {
  data: Picture;
}

export const Pictures = {
  useAll(): UseApiState<Picture[]> {
    return useServerApi<Picture[]>(useCallback(() => {
      return request('GET', '/pictures')
        .then((res: PicturesIndexResponse) => res.data.pictures);
    }, []));
  },

  fetchPicture(pictureId:string) {
    return request('GET', `/pictures/${pictureId}`)
      .then((res: PictureResponse) => res.data);
  },

  useRecent(): UseApiState<Picture[]> {
    return useServerApi<Picture[]>(useCallback(() => {
      return request('GET', '/pictures/recent')
        .then((res: PicturesIndexResponse) => res.data.pictures);
    }, []));
  },

  useTag(tag: string): UseApiState<Picture[]> {
    return useServerApi<Picture[]>(useCallback(() => {
      return request('GET', '/pictures', { params: { tag } })
        .then((res: PicturesIndexResponse) => res.data.pictures);
    }, [tag]));
  },
};

export default Pictures;
