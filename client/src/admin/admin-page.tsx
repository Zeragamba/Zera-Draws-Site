import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { AdminNav } from './admin-nav';

import styles from './admin-page.module.scss';

export const AdminPage: FC = () => (
  <div className={styles.layout}>
    <div className={styles.nav}>
      <AdminNav />
    </div>
    <div className={styles.main}>
      <Outlet />
    </div>
  </div>
);
