import { Paper } from '@mui/material'
import React, { FC } from 'react'

import { ErrorPage } from './ErrorPage'
import { LoadingPage } from './LoadingPage'
import { useCustomContent$ } from '../../../Queries'
import { Markdown } from '../Components'

export const AboutPage: FC = () => {
  const customContent$ = useCustomContent$()

  if (customContent$.isPending) return <LoadingPage />
  if (customContent$.isError) return <ErrorPage error={String(customContent$.error)} />
  const contentMeta = customContent$.data

  return (
    <Paper sx={{ padding: 2 }}>
      <Markdown>{contentMeta.about}</Markdown>
    </Paper>
  )
}
