import { Stack, Typography } from "@mui/material"
import classnames from "classnames"
import { FC, MouseEventHandler, ReactNode } from "react"
import { useLocation, useNavigate } from "react-router-dom"

interface NavItemProps {
  label?: string | null
  to?: string
  onClick?: () => void
  adornments?: {
    left?: ReactNode
    right?: ReactNode
  }
  children?: ReactNode
}

export const NavItem: FC<NavItemProps> = ({
  label,
  to,
  onClick,
  adornments,
  children,
}) => {
  const location = useLocation()
  const navigate = useNavigate()

  const isExternalLink = !!to?.match(/^https?:\/\//)
  const isActive = location.pathname === to

  const onLinkClick: MouseEventHandler = (event) => {
    if (onClick) {
      event.preventDefault()
      return onClick()
    }

    if (to && !isExternalLink) {
      event.preventDefault()
      return navigate(to)
    }
  }

  return (
    <Stack
      component={to ? "a" : "div"}
      href={to}
      onClick={onLinkClick}
      target={isExternalLink ? "_blank" : undefined}
      className={classnames({
        active: isActive,
      })}
      sx={{
        padding: 2,
        cursor: "pointer",
        color: "inherit",
        textDecoration: "none",
        borderRadius: 2,
        transition: "background-color 250ms",

        flexDirection: "row",
        alignItems: "center",
        gap: 2,

        "&.active": {
          paddingLeft: "4px",
          borderLeft: "4px solid red",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderLeftColor: "primary.light",
        },

        "&:hover": {
          backgroundColor: "hsla(0deg, 0%, 100%, 15%)",
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
