import React, { FC } from 'react';

import { Header } from '../ui/header';

import styles from './admin-page.module.scss';

export const AdminLayout: FC = () => (
  <div className={styles.adminLayout}>
    <Header />
    <div className={styles.adminMain}>
      ADMIN!
    </div>
  </div>
);
