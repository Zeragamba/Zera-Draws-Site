import React from "react";
import {Gallery} from "../gallery";
import {Image} from "../image";

const rootFolder = "/images";

const images: Image[] = [
  {
    id: -1,
    date: "2020-12-30",
    title: "Sunset Palmer | Malcontent",
    src: rootFolder + "/2020-12/2020-12-30-01.png",
  },
  {
    id: -1,
    date: "2020-12-25",
    title: "Xmas Roshia",
    src: rootFolder + "/2020-12/2020-12-25-01.png",
  },
  {
    id: -1,
    date: "2020-12-22",
    title: "Thank You AnimeClaro",
    src: rootFolder + "/2020-12/2020-12-22-01.png",
  },
  {
    id: -1,
    date: "2020-12-07",
    title: "Ah Hem...",
    src: rootFolder + "/2020-12/2020-12-07-01.png",
  },
  {
    id: -1,
    date: "2020-11-26",
    title: "Ensign Applejack",
    src: rootFolder + "/2020-09/2020-09-26-01.png",
  },
].map((image, index) => {
  image.id = index;
  return image;
})

export function FeaturedGallery() {
  return (<Gallery title="Featured" images={images} reverse={false} />)
}