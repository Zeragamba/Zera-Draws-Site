import { Paper } from '@mui/material'
import React, { FC } from 'react'
import ReactMarkdown from 'react-markdown'

import { useSiteMeta } from '../../../Lib'
import { ErrorPage } from '../ErrorPage'
import { LoadingPage } from '../LoadingPage'

export const AboutPage: FC = () => {
  const contentMetaQuery = useSiteMeta('content')

  if (contentMetaQuery.isPending) return <LoadingPage />
  if (contentMetaQuery.isError) return <ErrorPage error={String(contentMetaQuery.error)} />
  const contentMeta = contentMetaQuery.data

  return (
    <Paper sx={{ padding: 2 }}>
      <ReactMarkdown>{contentMeta.about}</ReactMarkdown>
    </Paper>
  )
}
