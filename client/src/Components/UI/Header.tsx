import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Glass } from './Glass'
import { Text } from './Text'

import styles from './Header.module.scss'

export const Header: FC = () => {
  const navigate = useNavigate()

  return (
    <Glass className={styles.header} onClick={() => navigate('/')}>
      <header>
        <Text variant="h1">Zeragamba</Text>
      </header>
    </Glass>
  )
}
