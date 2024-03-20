import { Alert } from '@mui/material'
import React, { FC } from 'react'

import { isServerApiError } from '../../../../Api'

interface ErrorAlertProps {
  error: unknown
}

export const ErrorAlert: FC<ErrorAlertProps> = ({
  error,
}) => {
  return <Alert color={'error'}>{getMessage(error)}</Alert>
}

export function getMessage(error: unknown): string {
  if (typeof error === 'string') return error
  if (isServerApiError(error)) return error.response.data.error
  return String(error)
}
