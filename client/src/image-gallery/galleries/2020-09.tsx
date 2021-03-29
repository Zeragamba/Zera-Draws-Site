import React from "react";
import {Gallery} from "../gallery";
import {Image} from "../image";

const rootFolder = "/images/2020-09";

const images: Image[] = [
  {
    id: 2020090501,
    date: "2020-09-05",
    title: "Roshia Ref",
    src: rootFolder + "/2020-09-05-01.png",
  },
  {
    id: 2020092601,
    date: "2020-11-26",
    title: "Ensign Applejack",
    src: rootFolder + "/2020-09-26-01.png",
  },
]

export function Gallery_2020_09() {
  return (<Gallery title="September 2020" images={images} reverse={true} />)
}