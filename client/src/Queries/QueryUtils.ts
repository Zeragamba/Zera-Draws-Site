import { PagedResMetaData } from '../Api/Schemas/PagedResMetaDataSchema'

export const pagedQueryOptions = {
  initialPageParam: 0,
  getNextPageParam: (lastPage: PagedResMetaData) => {
    console.log({ page: lastPage.page, total: lastPage.total_pages })
    if (lastPage.page >= lastPage.total_pages) return null
    return lastPage.page + 1
  },
  getPreviousPageParam: (lastPage: PagedResMetaData) => {
    console.log({ page: lastPage.page, total: lastPage.total_pages })
    if (lastPage.page <= 0) return null
    return lastPage.page - 1
  },
}
