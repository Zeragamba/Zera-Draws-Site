import React, {FC} from 'react';

import {Header} from './header';
import {Main} from './main';
import {Sidebar} from './sidebar';

import styles from './layout.module.scss';

export const Layout: FC = () => (
  <div className={styles.layout}>
    <Header/>
    <Sidebar/>
    <Main/>
  </div>
);
