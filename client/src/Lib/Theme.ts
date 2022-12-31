import { createTheme } from '@mui/material'
import { CSSProperties } from 'react'

import './Theme.scss'

export const colours = {
  dark: 'hsl(0, 0%, 10%)',
  grey: 'hsl(0, 0%, 40%)',
  light: 'hsl(0, 0%, 95%)',
}

const displayFontFamily = [
  'Capriola',
  'sans-serif',
].join(', ')

const bodyFontFamily = [
  'Quicksand',
  'Arial',
  'sans-serif',
].join(', ')

export const darkTheme = createTheme({
  spacing: 4,
  palette: {
    mode: 'dark',
    text: {
      primary: colours.light,
    },
    background: {
      paper: colours.dark,
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

export const rootStyles = {
  '--spacing': darkTheme.spacing(),
  fontFamily: bodyFontFamily,
} as CSSProperties
