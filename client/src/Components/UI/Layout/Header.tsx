import { FC } from 'react'

import { Glass } from '../Glass'

import styles from './Header.module.scss'

export const Header: FC = () => (
  <Glass className={styles.header}>
    <header>
      <div className={styles.headerText}>Zeragamba</div>
    </header>
  </Glass>
)
