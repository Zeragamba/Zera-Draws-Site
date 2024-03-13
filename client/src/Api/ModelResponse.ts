import { AxiosResponse } from 'axios'

export type ModelResData<Field extends string, Model> = {
  [field in Field]: Model
}

export type ModelResponse<Field extends string, Model> = AxiosResponse<ModelResData<Field, Model>>

export function isModelResponse<Field extends string, Model>(
  field: Field,
  isModel: (data: unknown) => data is Model,
  res: AxiosResponse,
): res is ModelResponse<Field, Model> {
  return (
    res.data
    && field in res.data
    && isModel(res.data[field])
  )
}

export type PagedModelResponseData<Field extends string, Model> = {
  count: number
  page: number
  total_pages: number
} & {
  [field in Field]: Model[]
}

export type PagedModelResponse<Field extends string, Model> = AxiosResponse<PagedModelResponseData<Field, Model>>

export function isPagedModelResponse<Model, Field extends string>(
  field: Field,
  isModel: (data: unknown) => data is Model,
  res: AxiosResponse,
): res is PagedModelResponse<Field, Model> {
  return (
    isModelResponse(field, isModel, res)
    && 'count' in res.data && typeof res.data.count === 'number'
    && 'page' in res.data && typeof res.data.page === 'number'
    && 'total_pages' in res.data && typeof res.data.total_pages === 'number'
  )
}
