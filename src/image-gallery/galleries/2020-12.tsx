import React from "react";
import {Gallery} from "../gallery";
import {Image} from "../image";

const rootFolder = "/images/2020-12";

const images: Image[] = [
  {
    id: 2020120701,
    date: "2020-12-07",
    title: "Ah Hem...",
    src: rootFolder + "/2020-12-07-01.png",
  },
  {
    id: 2020121901,
    date: "2020-12-19",
    title: "Thank You AnimalGlitch",
    src: rootFolder + "/2020-12-19-01.png",
  },
  {
    id: 2020122101,
    date: "2020-12-21",
    title: "Thank You JustinWolfe",
    src: rootFolder + "/2020-12-21-01.png",
  },
  {
    id: 2020122201,
    date: "2020-12-22",
    title: "Thank You AnimeClaro",
    src: rootFolder + "/2020-12-22-01.png",
  },
  {
    id: 2020122501,
    date: "2020-12-25",
    title: "Xmas Roshia",
    src: rootFolder + "/2020-12-25-01.png",
  },
  {
    id: 2020122502,
    date: "2020-12-25",
    title: "Xmas Sunset",
    src: rootFolder + "/2020-12-25-02.png",
  },
  {
    id: 2020122601,
    date: "2020-12-26",
    title: "2020 Review",
    src: rootFolder + "/2020-12-26-01.png",
  },
  {
    id: 2020122801,
    date: "2020-12-28",
    title: "Psycho Crusher Cinder Fall | Nemsislivezx",
    src: rootFolder + "/2020-12-28-01.png",
  },
  {
    id: 2020123001,
    date: "2020-12-30",
    title: "Sunset Palmer | Malcontent",
    src: rootFolder + "/2020-12-30-01.png",
  },
  {
    id: 2020123101,
    date: "2020-12-31",
    title: "Happy New Year!",
    src: rootFolder + "/2020-12-31-01.png",
  },
]

export function Gallery_2020_12() {
  return (<Gallery title="December 2020" images={images} reverse={true} />)
}