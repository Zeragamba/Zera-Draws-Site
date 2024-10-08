import { createTheme } from "@mui/material"
import { CSSProperties } from "react"

export const Colours = {
  primary: "hsl(0, 91%, 25%)",
  secondary: "hsl(34, 79%, 61%)",
  dark: "hsl(0,0%,22%)",
  grey: "hsl(0, 0%, 40%)",
  light: "hsl(0,0%,85%)",
}

export const DisplayFontFamily = ["Comfortaa", "cursive"].join(", ")

export const BodyFontFamily = ["Roboto", "sans-serif"].join(", ")

export const muiTheme = createTheme({
  spacing: 4,
  palette: {
    mode: "dark",
    primary: {
      main: Colours.primary,
    },
    secondary: {
      main: Colours.secondary,
    },
    text: {
      primary: Colours.light,
    },
    background: {
      paper: Colours.dark,
    },
  },
  typography: {
    fontFamily: BodyFontFamily,
    fontSize: 16,
    h1: {
      fontFamily: DisplayFontFamily,
      fontSize: "2.5rem",
    },
    h2: {
      fontFamily: DisplayFontFamily,
      fontSize: "2rem",
    },
    h3: {
      fontFamily: DisplayFontFamily,
      fontSize: "1.5rem",
    },
  },
})

type CSSVariables = Record<`--${string}`, string | number>

export type StyleProp = CSSProperties & CSSVariables
