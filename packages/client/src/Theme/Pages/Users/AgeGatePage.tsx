import { Button, Paper, Stack, Typography } from "@mui/material"
import { FC } from "react"

import { useAgeGate } from "../../../Lib"
import { PublicLayout } from "../../Layouts/PublicLayout"

export const AgeGatePage: FC = () => {
  const { verify } = useAgeGate()

  return (
    <PublicLayout thinHeader disableAgeGate>
      <Paper
        sx={{
          padding: 8,
          width: "max-content",
          textAlign: "center",
          margin: "auto",
        }}
      >
        <Stack gap={4}>
          <Typography variant="h1">Welcome</Typography>

          <Typography variant="body1">
            You must be 18 or older to visit this site.
          </Typography>

          <Button onClick={() => verify()}>Yes, I&apos;m 18 or older.</Button>
        </Stack>
      </Paper>
    </PublicLayout>
  )
}
