import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { AdminNav } from './AdminNav'

import styles from './AdminLayout.module.scss'

export const AdminLayout: FC = () => (
  <div className={styles.layout}>
    <div className={styles.nav}>
      <AdminNav />
    </div>
    <div className={styles.main}>
      <Outlet />
    </div>
  </div>
)
