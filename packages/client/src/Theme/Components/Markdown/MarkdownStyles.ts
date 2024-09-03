import { lighten, SxProps, useTheme } from "@mui/material/styles"

export function useMarkdownStyles(): SxProps {
  const theme = useTheme()

  return {
    ".markdown, &.markdown": {
      fontFamily: theme.typography.fontFamily,
      padding: 1,
      margin: 0,
      paddingTop: 3,

      "& a": {
        color: lighten(theme.palette.primary.light, 0.5),
        textDecoration: "none",
      },

      "& p": {
        margin: 0,
        padding: 0,
        paddingTop: 2,
        ...theme.typography.body1,
      },

      "& h1": {
        margin: 0,
        marginBottom: 2,
        padding: 0,
        ...theme.typography.h1,
      },

      "& h2": {
        margin: 0,
        padding: 0,
        ...theme.typography.h2,
      },

      "& h3": {
        margin: 0,
        padding: 0,
        ...theme.typography.h3,
      },

      "& h4": {
        margin: 0,
        padding: 0,
        ...theme.typography.h4,
      },

      "& h5": {
        margin: 0,
        padding: 0,
        ...theme.typography.h5,
      },

      "& h6": {
        margin: 0,
        padding: 0,
        ...theme.typography.h6,
      },
    },
  }
}
