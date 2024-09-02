import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { FC } from "react"

import { PasskeyForm } from "./PasskeyForm"
import { UserPasskeysList } from "./PasskeysList"
import { PasskeyData } from "../../../../Api/Schemas"
import { FontAwesomeIcon } from "../../../../Lib"
import { useCreatePasskey$, useRegisterPasskey$ } from "../../../../Queries"
import { ErrorAlert } from "../../Shared"

export const Passkeys: FC = () => {
  const createPasskey$ = useCreatePasskey$()
  const registerPasskey$ = useRegisterPasskey$()

  const onRegisterPasskey = (passkey: PasskeyData) => {
    if (!createPasskey$.data) return
    const { challenge, publicKeyCredential } = createPasskey$.data
    registerPasskey$
      .mutateAsync({ passkey, challenge, publicKeyCredential })
      .then(() => createPasskey$.reset())
      .catch((e) => console.error(e))
  }

  return (
    <Paper>
      <Stack padding={2} gap={2}>
        <Stack direction={"row"}>
          <Typography variant="h2" flexGrow={1}>
            Passkeys
          </Typography>
          <Button
            disabled={createPasskey$.isPending}
            startIcon={
              createPasskey$.isPending ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                <FontAwesomeIcon icon={faPlus} />
              )
            }
            variant="contained"
            onClick={() => createPasskey$.mutate({})}
          >
            Add Passkey
          </Button>
        </Stack>

        {createPasskey$.isError && <ErrorAlert error={createPasskey$.error} />}

        <Divider />

        <UserPasskeysList />
      </Stack>

      <Dialog open={!!createPasskey$.data}>
        <Stack gap={2} padding={2}>
          <Typography>
            Passkey successfully created. Please name the key so you can
            identify it later.
          </Typography>

          <PasskeyForm
            loading={registerPasskey$.isPending}
            passkey={{ id: "(New)", name: "" }}
            onSubmit={onRegisterPasskey}
          />

          {registerPasskey$.isError && (
            <ErrorAlert error={registerPasskey$.error} />
          )}
        </Stack>
      </Dialog>
    </Paper>
  )
}
