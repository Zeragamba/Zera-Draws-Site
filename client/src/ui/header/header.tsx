import React, { FC } from 'react';
import styles from './header.module.scss';

export const Header: FC = () => (
  <header className={styles.header}>
    <div className={styles.headerText}>Zeragamba</div>
    <div className={styles.subtitle}>Learning to art</div>
  </header>
);
