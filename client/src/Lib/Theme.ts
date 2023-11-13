import { createTheme } from '@mui/material'
import { CSSProperties } from 'react'

export const Colours = {
  primary: 'hsl(0, 91%, 25%)',
  secondary: 'hsl(34, 79%, 61%)',
  dark: 'hsl(0, 0%, 10%)',
  grey: 'hsl(0, 0%, 40%)',
  light: 'hsl(15,44%,93%)',
}

const displayFontFamily = [
  'Shantell Sans',
  'cursive',
].join(', ')

const bodyFontFamily = [
  'Nunito',
  'sans-serif',
].join(', ')

export const darkTheme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: Colours.primary,
    },
    secondary: {
      main: Colours.secondary,
    },
    text: {
      primary: Colours.dark,
    },
    background: {
      paper: Colours.light,
    },
  },
  typography: {
    fontFamily: bodyFontFamily,
    h1: {
      fontFamily: displayFontFamily,
      fontSize: '4rem',
    },
    h2: {
      fontFamily: displayFontFamily,
      fontSize: '2rem',
    },
    h3: {
      fontFamily: displayFontFamily,
      fontSize: '1.5rem',
    },
  },
})

type CSSVariables = Record<`--${string}`, string | number>

export type StyleProp = CSSProperties & CSSVariables
