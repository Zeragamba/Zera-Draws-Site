import { AxiosResponse } from 'axios'

export interface ErrorResponse extends AxiosResponse {
  data: {
    error: string
  }
}

export function isErrorResponse(obj: unknown): obj is ErrorResponse {
  if (!obj) return false

  const errorRes = obj as ErrorResponse

  return (
    typeof errorRes === 'object'
    && typeof errorRes.data === 'object'
    && typeof errorRes.data.error === 'string'
  )
}
