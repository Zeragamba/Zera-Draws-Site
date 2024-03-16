import { ViewMetricsData } from '../../Lib'
import { ViewMetricsResSchema } from '../Schemas/ViewMetricsDataSchema'
import { ServerApi } from '../ServerApi'

export class MetricsApiClient extends ServerApi {
  fetchViews(params: {
    startDate?: Date | null
    endDate?: Date | null
  } = {}): Promise<ViewMetricsData[]> {
    const { startDate, endDate } = params

    return this.get('/metrics/views', {
      data: {
        start_date: startDate?.toDateString(),
        end_date: endDate?.toDateString(),
      },
      parseData: (data) => ViewMetricsResSchema.parse(data),
    })
  }
}

export const metricsApiClient = new MetricsApiClient()
