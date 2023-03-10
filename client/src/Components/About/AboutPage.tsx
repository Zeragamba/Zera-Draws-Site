import { Paper } from '@mui/material'
import React, { FC } from 'react'
import ReactMarkdown from 'react-markdown'

import { PublicLayout } from '../Layouts'
import { useSiteMeta } from '../SiteMeta/UseSiteMeta'
import { ErrorPage } from '../UI/ErrorPage'
import { LoadingPage } from '../UI/LoadingPage'

export const AboutPage: FC = () => {
  const contentMetaQuery = useSiteMeta('content')

  if (contentMetaQuery.isLoading) return <LoadingPage />
  if (contentMetaQuery.isError) return <ErrorPage error={String(contentMetaQuery.error)} />
  const contentMeta = contentMetaQuery.data

  return (
    <PublicLayout>
      <Paper sx={{ padding: 2 }}>
        <ReactMarkdown>{contentMeta.about}</ReactMarkdown>
      </Paper>
    </PublicLayout>
  )
}
