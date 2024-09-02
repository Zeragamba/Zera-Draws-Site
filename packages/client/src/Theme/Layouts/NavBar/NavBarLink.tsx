import { Button } from "@mui/material"
import { FC, MouseEventHandler, Ref } from "react"
import { useNavigate } from "react-router-dom"
import { Colours } from "../../MuiTheme.ts"

interface NavBarLinkProps {
  to?: string
  disabled?: boolean
  onClick?: () => void
  label: string
  target?: string
  buttonRef?: Ref<HTMLAnchorElement>
  active?: boolean
}

export const NavBarLink: FC<NavBarLinkProps> = ({
  to = "/",
  label,
  disabled,
  onClick,
  target,
  buttonRef,
}) => {
  const navigate = useNavigate()

  const onBtnClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (target) return
    event.preventDefault()

    if (onClick) return onClick()
    navigate(to)
  }

  return (
    <Button
      component="a"
      href={to}
      sx={{
        color: Colours.light,
        textTransform: "revert",
        "&:hover": {
          backgroundColor: "primary.dark",
        },
      }}
      target={target}
      rel="noopener"
      onClick={onBtnClick}
      ref={buttonRef}
      disabled={disabled}
    >
      {label}
    </Button>
  )
}
