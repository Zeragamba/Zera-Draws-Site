import { Box } from "@mui/material"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { FC } from "react"
import { RouterProvider } from "react-router-dom"
import { Config } from "../../Config"
import { SiteMetaProvider } from "../../Lib"
import { appRouter } from "../AppRouter"
import { appStyles } from "../AppStyles"

import { AppProviders } from "./AppProviders"

export const App: FC = () => {
  return (
    <SiteMetaProvider
      name="Zeragamba"
      copyright={`${new Date().getFullYear()} Zeragamba`}
    >
      <AppProviders>
        <Box id="app-root" sx={appStyles}>
          <RouterProvider router={appRouter} />
        </Box>

        <div id="modal-root" />

        {Config.ENVIRONMENT === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </AppProviders>
    </SiteMetaProvider>
  )
}
