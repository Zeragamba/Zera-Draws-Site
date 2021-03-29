import React from "react";
import {Gallery_2020_08} from "../../image-gallery/galleries/2020-08";
import {Gallery_2020_09} from "../../image-gallery/galleries/2020-09";
import {Gallery_2020_10} from "../../image-gallery/galleries/2020-10";
import {Gallery_2020_11} from "../../image-gallery/galleries/2020-11";
import {Gallery_2020_12} from "../../image-gallery/galleries/2020-12";
import {FeaturedGallery} from "../../image-gallery/galleries/featured";

import styles from "./main.module.scss";

const galleries = [
  Gallery_2020_12,
  Gallery_2020_11,
  Gallery_2020_10,
  Gallery_2020_09,
  Gallery_2020_08,
]

export const Main = () => (
  <main className={styles.main}>
    <FeaturedGallery />
    {galleries.map((Gallery, index) => (
      <Gallery key={index} />
    ))}
  </main>
)