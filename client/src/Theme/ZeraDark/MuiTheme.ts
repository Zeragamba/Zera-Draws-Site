import { createTheme } from '@mui/material'
import { CSSProperties } from 'react'

export const Colours = {
  primary: 'hsl(0, 91%, 25%)',
  secondary: 'hsl(34, 79%, 61%)',
  dark: 'hsl(0, 0%, 10%)',
  grey: 'hsl(0, 0%, 40%)',
  light: 'hsl(15,44%,93%)',
}

export const DisplayFontFamily = [
  'Comfortaa',
  'cursive',
].join(', ')

export const BodyFontFamily = [
  'Roboto',
  'sans-serif',
].join(', ')

export const MuiTheme = createTheme({
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
    fontFamily: BodyFontFamily,
    h1: {
      fontFamily: DisplayFontFamily,
      fontSize: '2.5rem',
    },
    h2: {
      fontFamily: DisplayFontFamily,
      fontSize: '2rem',
    },
    h3: {
      fontFamily: DisplayFontFamily,
      fontSize: '1.5rem',
    },
  },
})

type CSSVariables = Record<`--${string}`, string | number>

export type StyleProp = CSSProperties & CSSVariables
