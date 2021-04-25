import React, { FC } from 'react';

import { AllPicturesGallery } from './image-gallery/galleries/all-pictures-gallery';
import { FeaturedGallery } from './image-gallery/galleries/featured-gallery';

import styles from './home-page.module.scss';
import { Header } from '../ui/header';
import { Sidebar } from './sidebar';

export const HomePage: FC = () => (
  <div className={styles.layout}>
    <Header />
    <Sidebar />
    <div className={styles.main}>
      <FeaturedGallery />
      <AllPicturesGallery />
    </div>
  </div>
);
