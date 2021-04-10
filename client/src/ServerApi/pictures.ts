import {AxiosResponse} from "axios";

import request from "./request";
import {useCallback} from "react";
import useServerApi from "./useServerApi";

export interface Picture {
  id: string;
  date: string;
  order: number;
  title: string;
  src: string;
}

export interface PicturesIndexResponse extends AxiosResponse {
  data: {
    size: number;
    pictures: Picture[];
  }
}

const Pictures = {
  useAll() {
    return useServerApi(useCallback(() => {
      return request("GET", "/pictures")
        .then((res: PicturesIndexResponse) => res.data.pictures);
    }, []));
  },
  useTag(tag: string) {
    return useServerApi(useCallback(() => {
      return request("GET", "/pictures", {tag})
        .then((res: PicturesIndexResponse) => res.data.pictures);
    }, [tag]));
  },
};

export default Pictures;
