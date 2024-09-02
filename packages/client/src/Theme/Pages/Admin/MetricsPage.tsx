import { Button, ButtonGroup, Paper, Stack } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { DatePicker } from "@mui/x-date-pickers"
import * as DateFns from "date-fns"
import { FC, useState } from "react"

import { ViewMetricsData } from "../../../Models"
import { useViewMetrics$ } from "../../../Queries"
import { MetricsExportBtn, Spinner } from "../../Components"

type TimeWindow = { label: string; start: Date | null; end: Date | null }

export const MetricsPage: FC = () => {
  const today = new Date()

  const timeWindows: TimeWindow[] = [
    { label: "Today", start: today, end: null },
    { label: "Week", start: DateFns.startOfWeek(today), end: null },
    { label: "Month", start: DateFns.startOfMonth(today), end: null },
    { label: "Year", start: DateFns.startOfYear(today), end: null },
    { label: "All Time", start: null, end: null },
  ]

  const [selected, setSelected] = useState<string | null>("All Time")
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const metrics$ = useViewMetrics$({ startDate, endDate })

  const columns: GridColDef<ViewMetricsData>[] = [
    { field: "title", headerName: "Posts Title", flex: 1 },
    { field: "views", headerName: "Total Views", width: 150 },
    { field: "unique_views", headerName: "Unique Views", width: 150 },
  ]

  return (
    <Stack gap={2}>
      <Paper sx={{ padding: 2 }}>
        <Stack gap={2}>
          <Stack gap={2} direction={"row"} sx={{ paddingTop: 2 }}>
            <DatePicker
              label="Start Date"
              value={startDate || null}
              onChange={(date) => {
                setSelected(null)
                setStartDate(date)
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                },
              }}
            />
            <DatePicker
              label="End Date"
              value={endDate || null}
              onChange={(date) => {
                setSelected(null)
                setEndDate(date)
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                },
              }}
            />
          </Stack>

          <Stack gap={2} direction={"row"} justifyContent={"space-between"}>
            <ButtonGroup>
              {timeWindows.map((window) => (
                <Button
                  key={window.label}
                  variant={selected === window.label ? "contained" : "outlined"}
                  onClick={() => {
                    setSelected(window.label)
                    setStartDate(window.start)
                    setEndDate(window.end)
                  }}
                >
                  {window.label}
                </Button>
              ))}
            </ButtonGroup>

            {metrics$.data && <MetricsExportBtn metrics={metrics$.data} />}
          </Stack>
        </Stack>
      </Paper>

      <Paper sx={{ padding: 2, height: 600 }}>
        {metrics$.isPending && <Spinner />}
        {metrics$.isError && <div>{String(metrics$.error)}</div>}
        {metrics$.data && (
          <DataGrid
            columns={columns}
            rows={metrics$.data}
            density={"compact"}
          />
        )}
      </Paper>
    </Stack>
  )
}
