import React from "react";
import {Gallery} from "../gallery";
import {Image} from "../image";

const rootFolder = "/images/2020-10";

const images: Image[] = [
  {
    id: 2020100101,
    date: "2020-10-01",
    title: "Inktober 2020 | Fish",
    src: rootFolder + "/2020-10-01-01.jpg",
  },
  {
    id: 2020100201,
    date: "2020-10-02",
    title: "Inktober 2020 | Wisp",
    src: rootFolder + "/2020-10-02-01.jpg",
  },
  {
    id: 2020100301,
    date: "2020-10-03",
    title: "Inktober 2020 | Bulky",
    src: rootFolder + "/2020-10-03-01.jpg",
  },
  {
    id: 2020100401,
    date: "2020-10-04",
    title: "Inktober 2020 | Radio",
    src: rootFolder + "/2020-10-04-01.jpg",
  },
  {
    id: 2020100501,
    date: "2020-10-05",
    title: "Inktober 2020 | Blade",
    src: rootFolder + "/2020-10-05-01.jpg",
  },
  {
    id: 2020100601,
    date: "2020-10-06",
    title: "Inktober 2020 | Rodent",
    src: rootFolder + "/2020-10-06-01.jpg",
  },
  {
    id: 2020100701,
    date: "2020-10-07",
    title: "Inktober 2020 | Fancy",
    src: rootFolder + "/2020-10-07-01.jpg",
  },
  {
    id: 2020101801,
    date: "2020-10-18",
    title: "Roshia Ref v2",
    src: rootFolder + "/2020-10-18-01.png",
  },
  {
    id: 2020102001,
    date: "2020-10-20",
    title: "Ensign Rarity",
    src: rootFolder + "/2020-10-20-01.png",
  },
]

export function Gallery_2020_10() {
  return (<Gallery title="October 2020" images={images} reverse={true} />)
}