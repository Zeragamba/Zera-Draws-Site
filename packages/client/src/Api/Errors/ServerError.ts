import { AxiosError, isAxiosError } from "axios"

import { ErrorResponse } from "./ErrorResponse"

export interface ServerApiError extends AxiosError {
  response: ErrorResponse
}

export function isServerApiError(error: unknown): error is ServerApiError {
  return isAxiosError(error) && error.response?.data.error
}

export function isNotFoundError(error: unknown): error is ServerApiError {
  if (!isServerApiError(error)) return false
  return error.response.status === 404
}
