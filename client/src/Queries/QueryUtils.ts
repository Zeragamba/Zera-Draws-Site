import { PagedResMetaData } from '../Api'

export const pagedQueryOptions = {
  initialPageParam: 0,
  getNextPageParam: (lastPage: PagedResMetaData) => {
    if (lastPage.page < lastPage.total_pages - 1) return lastPage.page + 1
  },
  getPreviousPageParam: (lastPage: PagedResMetaData) => {
    if (lastPage.page > 0) return lastPage.page - 1
  },
}
