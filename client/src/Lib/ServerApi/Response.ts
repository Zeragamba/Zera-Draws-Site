import { ServerApiError } from './ServerClient'

export type ModelResponse<Field extends string, Model> = {
  [field in Field]: Model
}

export type PagedModelResponse<Field extends string, Model> = {
  count: number
  page: number
  total_pages: number
} & {
  [field in Field]: Model[]
}

export type ErrorRes = ServerApiError
