import React, { FC } from 'react';

import { Header } from '../ui/header';
import { Main } from './main';
import { Sidebar } from './sidebar';

import styles from './home-page.module.scss';

export const HomePage: FC = () => (
  <div className={styles.layout}>
    <Header />
    <Sidebar />
    <Main />
  </div>
);
