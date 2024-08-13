import { Chip, ChipProps } from '@mui/material'
import { FC, MouseEventHandler } from 'react'

type TagChipProps =
  & ChipProps
  & { href?: string }

export const TagChip: FC<TagChipProps> = ({
  href,
  onClick,
  ...chipProps
}) => {
  const onChipClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (onClick) onClick(event)
  }

  return (
    <Chip
      sx={{
        '.MuiChip-icon': { width: '14px', marginLeft: '8px' },
        '.MuiChip-label': { marginTop: '2px' },
      }}
      color="primary"
      size="small"
      {...chipProps}
      component={href ? 'a' : 'div'}
      href={href}
      onClick={onClick ? onChipClick : undefined}
    />
  )
}
