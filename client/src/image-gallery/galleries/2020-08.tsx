import React from "react";
import {Gallery} from "../gallery";
import {Image} from "../image";

const rootFolder = "/images/2020-08";

const images: Image[] = [
  {
    id: 2020080801,
    date: "2020-08-08",
    title: "Ensign Twilight",
    src: rootFolder + "/2020-08-08-01.png",
  },
  {
    id: 2020080802,
    date: "2020-08-08",
    title: "Ensign Twilight",
    src: rootFolder + "/2020-08-08-02.png",
  },
  {
    id: 2020082101,
    date: "2020-08-21",
    title: "Ready to Fight",
    src: rootFolder + "/2020-08-21-01.png",
  },
  {
    id: 2020082201,
    date: "2020-08-22",
    title: "Ensign Sunset",
    src: rootFolder + "/2020-08-22-01.png",
  },
]

export function Gallery_2020_08() {
  return (<Gallery title="August 2020" images={images} reverse={true} />)
}