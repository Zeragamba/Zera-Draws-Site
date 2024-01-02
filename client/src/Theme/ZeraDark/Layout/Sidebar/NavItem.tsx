import { Stack, Typography } from '@mui/material'
import { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface NavItemProps {
  label?: string | null
  to: string
  adornments?: {
    left?: ReactNode
    right?: ReactNode
  }
  children?: ReactNode
}

export const NavItem: FC<NavItemProps> = ({
  label,
  to,
  adornments,
  children,
}) => {
  const navigate = useNavigate()

  const isExternalLink = !!(to?.match(/^https?:\/\//))

  const onClick = () => {
    navigate(to)
  }

  return (
    <Stack
      component="a"
      href={to}
      onClick={onClick}
      target={isExternalLink ? '_blank' : undefined}
      sx={{
        padding: 2,
        cursor: 'pointer',
        color: 'inherit',
        textDecoration: 'none',
        borderRadius: 2,
        transition: 'background-color 250ms',

        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,

        '&:hover': {
          backgroundColor: 'hsla(0deg, 0%, 100%, 15%)',
        },
      }}
    >
      {adornments?.left}
      {label && <Typography sx={{ flexGrow: 1 }}>{label}</Typography>}
      {children}
      {adornments?.right}
    </Stack>
  )
}