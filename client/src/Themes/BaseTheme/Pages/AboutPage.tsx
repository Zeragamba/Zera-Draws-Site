import { Paper } from '@mui/material'
import React, { FC } from 'react'
import ReactMarkdown from 'react-markdown'

import { ErrorPage } from './ErrorPage'
import { LoadingPage } from './LoadingPage'
import { useCustomContent$ } from '../../../Queries'

export const AboutPage: FC = () => {
  const customContent$ = useCustomContent$()

  if (customContent$.isPending) return <LoadingPage />
  if (customContent$.isError) return <ErrorPage error={String(customContent$.error)} />
  const contentMeta = customContent$.data

  return (
    <Paper sx={{ padding: 2 }}>
      <ReactMarkdown>{contentMeta.about}</ReactMarkdown>
    </Paper>
  )
}
