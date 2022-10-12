import { FC } from 'react'

import { AllPicturesGallery } from '../../Pictures/ImageGallery/galleries/AllPicturesGallery'
import { FeaturedGallery } from '../../Pictures/ImageGallery/galleries/FeaturedGallery'
import { RecentGallery } from '../../Pictures/ImageGallery/galleries/RecentGallery'
import { AppNavBar } from '../../UI/AppNavBar'
import { Header } from '../../UI/Header'
import { Sidebar } from './Sidebar'

import styles from './HomePage.module.scss'

export const HomePage: FC = () => (
  <div className={styles.layout}>
    <Header />
    <div className={styles.sidebar}>
      <Sidebar />
    </div>
    <div className={styles.navbar}>
      <AppNavBar />
    </div>
    <div className={styles.main}>
      <FeaturedGallery />
      <RecentGallery numImages={10} />
      <AllPicturesGallery />
    </div>
  </div>
)
