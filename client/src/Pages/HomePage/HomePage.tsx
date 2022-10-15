import { FC } from 'react'

import { AllPostsGallery } from '../../Components/Gallery/Galleries/AllPostsGallery'
import { FeaturedGallery } from '../../Components/Gallery/Galleries/FeaturedGallery'
import { AppNavBar } from '../../Components/UI/AppNavBar'
import { Header } from '../../Components/UI/Header'
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
      <AllPostsGallery />
    </div>
  </div>
)
