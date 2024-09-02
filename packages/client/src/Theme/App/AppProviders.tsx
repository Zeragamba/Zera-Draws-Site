import { ThemeProvider } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { QueryClientProvider } from "@tanstack/react-query"
import { FC, PropsWithChildren, ReactNode } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { PreloadProvider } from "./PreloadProvider.tsx"
import { queryClient } from "../../Lib/QueryClient.ts"
import { muiTheme } from "../MuiTheme.ts"
import { AgeGateProvider } from "../../Lib"

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  // prettier-ignore
  const providers: ((children: ReactNode) => ReactNode)[] = [
    (children) => <ThemeProvider theme={muiTheme} children={children} />,
    (children) => <LocalizationProvider dateAdapter={AdapterDateFns} children={children} />,
    (children) => <QueryClientProvider client={queryClient} children={children} />,
    (children) => <AgeGateProvider children={children} />,
    (children) => <PreloadProvider children={children} />,
    (children) => <DndProvider backend={HTML5Backend} children={children} />
  ]

  let stack = children
  for (const provider of providers.toReversed()) {
    stack = provider(stack)
  }

  return stack
}
