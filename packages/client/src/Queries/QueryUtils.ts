import { PagedResMetaData } from "../Api/Schemas/PagedResMetaDataSchema"

export const pagedQueryOptions = {
  initialPageParam: 0,
  getNextPageParam: (lastPage: PagedResMetaData) => {
    if (lastPage.page >= lastPage.total_pages) return null
    return lastPage.page + 1
  },
  getPreviousPageParam: (lastPage: PagedResMetaData) => {
    if (lastPage.page <= 0) return null
    return lastPage.page - 1
  },
}
