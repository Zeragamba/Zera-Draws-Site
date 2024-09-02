import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../Queries"
import { metricsApiClient } from "./MetricsApi"

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
