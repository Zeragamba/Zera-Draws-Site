import classnames from 'classnames'
import { FC } from 'react'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'

import { Glass } from '../../UI/Glass'

import styles from './AdminNav.module.scss'

export const AdminNav: FC = () => {
  return (
    <Glass style={{ padding: 0 }}>
      <NavItem to={'/'} label="< Back" />
      <NavItem to={'/admin/upload'} label="Upload" />
    </Glass>
  )
}

interface NavItemProps {
  to: string
  label: string
}

const NavItem: FC<NavItemProps> = ({ to, label }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const linkActive = !!matchPath(location.pathname, to)

  return (
    <div
      className={classnames(styles.navItem, { [styles.navItemActive]: linkActive })}
      onClick={() => navigate(to)}
    >{label}</div>
  )
}
