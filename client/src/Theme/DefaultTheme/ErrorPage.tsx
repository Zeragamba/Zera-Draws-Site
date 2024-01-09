import { Paper, Typography } from '@mui/material'
import { FC } from 'react'

import { PublicLayout } from './Layout'

interface ErrorPageProps {
  error: string
}

export const ErrorPage: FC<ErrorPageProps> = ({
  error,
}) => {
  return (
    <PublicLayout>
      <Paper>
        <h1>Error!</h1>
        <Typography>{error}</Typography>
      </Paper>
    </PublicLayout>
  )
}
