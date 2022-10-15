import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Glass } from './Glass'

import styles from './Header.module.scss'

export const Header: FC = () => {
  const navigate = useNavigate()

  return (
    <Glass className={styles.header} onClick={() => navigate('/')}>
      <header>Zeragamba</header>
    </Glass>
  )
}
