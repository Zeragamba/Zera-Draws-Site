import {AxiosResponse} from "axios";

import request from "./request";

const Pictures = {
  all() {
    return request("GET", "/pictures")
      .then((res: PicturesIndexResponse) => res.data.pictures);
  },
  tag(tag: string) {
    return request("GET", "/pictures", {tag})
      .then((res: PicturesIndexResponse) => res.data.pictures);
  },
};

export default Pictures;

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
