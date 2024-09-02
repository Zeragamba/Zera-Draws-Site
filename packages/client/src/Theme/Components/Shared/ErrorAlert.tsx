import { Alert } from "@mui/material"
import { FC } from "react"

import { isServerApiError } from "../../../Lib/ServerApi"

interface ErrorAlertProps {
  error: unknown
}

export const ErrorAlert: FC<ErrorAlertProps> = ({ error }) => {
  return <Alert severity="error">{getMessage(error)}</Alert>
}

function getMessage(error: unknown): string {
  if (typeof error === "string") return error
  if (isServerApiError(error)) return error.response.data.error
  return String(error)
}
