import { MenuItem } from '@mui/material'
import React, { FC, MouseEventHandler } from 'react'
import { useHref, useLocation, useNavigate } from 'react-router-dom'

interface AdminNavItemProps {
  to: string
  label: string
}

export const AdminNavItem: FC<AdminNavItemProps> = ({
  to,
  label,
}) => {
  const navigate = useNavigate()
  const href = useHref(to)
  const location = useLocation()

  const onClick: MouseEventHandler = (event) => {
    event.preventDefault()
    navigate(to)
  }

  return (
    <MenuItem
      component="a"
      href={href}
      selected={location.pathname === href}
      onClick={onClick}
    >
      {label}
    </MenuItem>
  )
}
