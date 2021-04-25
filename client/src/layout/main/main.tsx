import React, { FC } from 'react';

import { AllPicturesGallery } from '../../image-gallery/galleries/all-pictures-gallery';
import { FeaturedGallery } from '../../image-gallery/galleries/featured-gallery';
import { RecentGallery } from '../../image-gallery/galleries/recent-gallery';

import styles from './main.module.scss';

export const Main: FC = () => (
  <main className={styles.main}>
    <FeaturedGallery />
    <RecentGallery />
    <AllPicturesGallery />
  </main>
);
