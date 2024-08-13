import { useQuery } from "@tanstack/react-query"

import { queryKeys } from "./QueryKeys"
import { metricsApiClient } from "../Api"

export const useViewMetrics$ = (params: {
  startDate?: Date | null
  endDate?: Date | null
}) => {
  return useQuery({
    ...queryKeys.metrics.postViews,
    queryFn: () => metricsApiClient.fetchViews(params),
    staleTime: 0,
  })
}
