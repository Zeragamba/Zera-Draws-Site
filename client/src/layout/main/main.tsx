import React from "react";
import {AllPicturesGallery} from "../../image-gallery/galleries/all-pictures";

import styles from "./main.module.scss";

export const Main = () => (
  <main className={styles.main}>
    <AllPicturesGallery />
  </main>
)
