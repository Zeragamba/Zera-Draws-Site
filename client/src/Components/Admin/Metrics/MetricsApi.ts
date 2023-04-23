import { ViewMetricsData } from './ViewMetricsData'
import { ServerClient } from '../../../Lib/ServerApi'

export namespace MetricsApi {

  export type ViewsParams = {
    startDate?: Date | null
    endDate?: Date | null
  }

  export function views({ startDate, endDate }: ViewsParams): Promise<ViewMetricsData[]> {
    return ServerClient.get('/metrics/views', {
      params: {
        start_date: startDate?.toDateString(),
        end_date: endDate?.toDateString(),
      },
    })
  }
}
