import { SxProps, Theme } from "@mui/material/styles"
import { RouterProviderProps } from "react-router-dom"

export interface AppTheme {
  appRouter: RouterProviderProps["router"]
  appStyles: SxProps
  muiTheme: Theme
}
