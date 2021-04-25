import { AxiosResponse } from 'axios';

import request from './request';
import { useCallback } from 'react';
import useServerApi, { UseServerApiReturn } from './use-server-api';

export interface Picture {
  id: string;
  date: string;
  order: number;
  title: string;
  srcs: {
    [size: string]: string
  };
  height: number;
  width: number;
}

export interface PicturesIndexResponse extends AxiosResponse {
  data: {
    size: number;
    pictures: Picture[];
  }
}

const Pictures = {
  useAll(): UseServerApiReturn<Picture[]> {
    return useServerApi<Picture[]>(useCallback(() => {
      return request('GET', '/pictures')
        .then((res: PicturesIndexResponse) => res.data.pictures);
    }, []));
  },
  useRecent(): UseServerApiReturn<Picture[]> {
    return useServerApi<Picture[]>(useCallback(() => {
      return request('GET', '/pictures/recent')
        .then((res: PicturesIndexResponse) => res.data.pictures);
    }, []));
  },
  useTag(tag: string): UseServerApiReturn<Picture[]> {
    return useServerApi<Picture[]>(useCallback(() => {
      return request('GET', '/pictures', { params: { tag } })
        .then((res: PicturesIndexResponse) => res.data.pictures);
    }, [tag]));
  },
};

export default Pictures;
