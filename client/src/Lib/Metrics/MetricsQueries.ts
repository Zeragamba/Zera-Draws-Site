import { createQueryKeys } from '@lukemorales/query-key-factory'
import { useQuery } from '@tanstack/react-query'

import { MetricsApi } from './MetricsApi'

export const metricsQueries = createQueryKeys('metrics', {
  views: (params: MetricsApi.ViewsParams) => ({
    queryKey: [ params ],
    queryFn: () => MetricsApi.views(params),
  }),
})

export const useViewMetrics$ = (params: MetricsApi.ViewsParams = {}) => {
  return useQuery({
    ...metricsQueries.views(params),
    staleTime: 0,
  })
}
