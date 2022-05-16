import { FC } from 'react'

import { AllPicturesGallery } from '../../Pictures/ImageGallery/galleries/all-pictures-gallery'
import { FeaturedGallery } from '../../Pictures/ImageGallery/galleries/featured-gallery'
import { Header } from '../../UI/Layout/Header'
import { Sidebar } from './Sidebar'

import styles from './HomePage.module.scss'

export const HomePage: FC = () => (
  <div className={styles.layout}>
    <Header />
    <div className={styles.sidebar}>
      <Sidebar />
    </div>
    <div className={styles.main}>
      <FeaturedGallery />
      <AllPicturesGallery />
    </div>
  </div>
)
