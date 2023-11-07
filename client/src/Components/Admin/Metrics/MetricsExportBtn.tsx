import { faCheck, faDownload, faSpinner, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { format as formatDate } from 'date-fns'
import { FC } from 'react'

import { ViewMetricsData } from './ViewMetricsData'
import { toCsv } from '../../../Lib/CsvExporter'
import { createFile, downloadFile } from '../../../Lib/FileUtils'

interface MetricsExportBtnProps {
  metrics: ViewMetricsData[]
}

export const MetricsExportBtn: FC<MetricsExportBtnProps> = ({
  metrics,
}) => {
  const export$ = useMutation({
    mutationFn: async (): Promise<void> => {
      const csvData = toCsv(metrics)
      const csvFile = createFile(csvData, 'text/csv')
      const timestamp = formatDate(Date.now(), 'yyyy-MM-dd')
      downloadFile(csvFile, `${timestamp}_export.csv`)
    },
  })

  let icon = <FontAwesomeIcon icon={faDownload} />
  if (export$.isPending) icon = <FontAwesomeIcon icon={faSpinner} spin />
  if (export$.isError) icon = <FontAwesomeIcon icon={faWarning} />
  if (export$.isSuccess) icon = <FontAwesomeIcon icon={faCheck} />

  return (
    <Button
      variant={'contained'}
      startIcon={icon}
      onClick={() => export$.mutate()}
    >Export</Button>
  )
}
