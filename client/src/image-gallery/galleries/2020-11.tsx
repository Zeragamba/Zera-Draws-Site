import React from "react";
import {Gallery} from "../gallery";
import {Image} from "../image";

const rootFolder = "/images/2020-11";

const images: Image[] = [
  {
    id: 2020111801,
    date: "2020-11-18",
    title: "Yang Xiao Long",
    src: rootFolder + "/2020-11-18-01.png",
  },
]

export function Gallery_2020_11() {
  return (<Gallery title="November 2020" images={images} reverse={true} />)
}