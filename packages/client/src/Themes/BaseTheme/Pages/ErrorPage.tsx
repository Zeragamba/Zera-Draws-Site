import { Paper, Typography } from '@mui/material'
import { FC } from 'react'


interface ErrorPageProps {
  error: string
}

export const ErrorPage: FC<ErrorPageProps> = ({
  error,
}) => {
  return (
    <Paper>
      <h1>Error!</h1>
      <Typography>{error}</Typography>
    </Paper>
  )
}
