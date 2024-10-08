import { ServerApi } from "../ServerApi"
import { ViewMetricsData } from "./ViewMetricsData"
import { ViewMetricsResSchema } from "./ViewMetricsDataSchema"

export class MetricsApi extends ServerApi {
  fetchViews(
    params: {
      startDate?: Date | null
      endDate?: Date | null
    } = {},
  ): Promise<ViewMetricsData[]> {
    const { startDate, endDate } = params

    return this.get("/metrics/views", {
      data: {
        start_date: startDate?.toDateString(),
        end_date: endDate?.toDateString(),
      },
      parseResData: (data) => ViewMetricsResSchema.parse(data),
    })
  }
}

export const metricsApiClient = new MetricsApi()
