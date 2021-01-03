import React from "react";

import {Image} from "../../image-gallery/image";
import {Gallery} from "../../image-gallery/gallery";

import styles from "./main.module.scss";

const images: Image[] = [
  {
    id: 1,
    src: "/images/1-wide.png",
    title: "Sunset Palmer",
    isWide: true,
    date: "2020-12-30"
  },
  {
    id: 2,
    src: "/images/2-tall.png",
    title: "Xmas Roshia",
    isWide: false,
    date: "2020-12-25"
  },
]

export const Main = () => (
  <main className={styles.main}>
    <Gallery title="December 2020" images={images} />
  </main>
)