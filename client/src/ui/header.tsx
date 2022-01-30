import { FC } from 'react';
import styles from './header.module.scss';
import { Glass } from './glass';

export const Header: FC = () => (
  <Glass className={styles.header}>
    <header>
      <div className={styles.headerText}>Zeragamba</div>
    </header>
  </Glass>
);
