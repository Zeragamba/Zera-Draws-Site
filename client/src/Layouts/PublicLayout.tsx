import { Outlet } from 'react-router-dom'

import { AppNavBar } from '../Components/UI/AppNavBar'
import { Header } from '../Components/UI/Header'
import { SocialsNav } from '../Components/UI/Sidebar'
import { Layout } from './Layout'

import styles from './PublicLayout.module.scss'


export const PublicLayout: Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.socials}>
        <SocialsNav />
      </div>
      <div className={styles.navbar}>
        <AppNavBar />
      </div>
      <div className={styles.main}>
        {children}
        <Outlet />
      </div>
    </div>
  )
}
