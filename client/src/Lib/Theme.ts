import { createTheme } from '@mui/material'
import { CSSProperties } from 'react'

export const darkTheme = createTheme({
  spacing: 4,
  palette: {
    mode: 'dark',
  },
})

export const rootStyles = {
  '--spacing': darkTheme.spacing(),
} as CSSProperties
