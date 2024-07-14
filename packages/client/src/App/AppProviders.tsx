import { ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { QueryClientProvider } from '@tanstack/react-query'
import React, { FC, PropsWithChildren, useMemo } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { AppTheme } from './AppTheme'
import { PreloadProvider } from './PreloadProvider'
import { queryClient } from './QueryClient'
import { AgeGateProvider } from '../Contexts'

type AppProvidersProps = PropsWithChildren<{
  theme: AppTheme
}>

export const AppProviders: FC<AppProvidersProps> = ({
  theme,
  children,
}) => {
  const providers = useMemo<FC<PropsWithChildren>[]>(() => [
    ({ children }) => <ThemeProvider theme={theme.muiTheme} children={children} />,
    ({ children }) => <LocalizationProvider dateAdapter={AdapterDateFns} children={children} />,
    ({ children }) => <QueryClientProvider client={queryClient} children={children} />,
    ({ children }) => <AgeGateProvider children={children} />,
    ({ children }) => <PreloadProvider children={children} />,
    ({ children }) => <DndProvider backend={HTML5Backend} children={children} />,
  ], [ theme ])

  let stack = children

  for (const Provider of providers.toReversed()) {
    stack = <Provider children={stack} />
  }

  return stack
}
