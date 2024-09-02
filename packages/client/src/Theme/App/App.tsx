import { Box } from "@mui/material"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { FC } from "react"
import { RouterProvider } from "react-router-dom"

import { AppProviders } from "./AppProviders"
import { Config } from "../../Config"
import { appStyles } from "../AppStyles"
import { appRouter } from "../AppRouter"

export const App: FC = () => {
  return (
    <AppProviders>
      <Box id="app-root" sx={appStyles}>
        <RouterProvider router={appRouter} />
      </Box>

      <div id="modal-root" />

      {Config.ENVIRONMENT === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </AppProviders>
  )
}
