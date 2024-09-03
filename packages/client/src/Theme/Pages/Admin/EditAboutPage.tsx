import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material"
import { FC } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import {
  ContentMeta,
  FeatureFlag,
  useCustomContent$,
  useFeatureFlags$,
  useUpdateCustomContent$,
  useUpdateFeatureFlags$,
} from "../../../Lib"
import { MarkdownEditor } from "../../Components"

export const EditAboutPage: FC = () => {
  const featureFlags$ = useFeatureFlags$()
  const featureFlags = featureFlags$.data || {}
  console.log(featureFlags)

  const customContent$ = useCustomContent$()
  const customContent = customContent$.data

  const aboutPageEnabled = featureFlags[FeatureFlag.AboutPage] || false

  const updateFlags$ = useUpdateFeatureFlags$()
  const updateCustomContent$ = useUpdateCustomContent$()

  const { handleSubmit, control } = useForm<ContentMeta>({
    values: customContent,
  })

  const onFormSave: SubmitHandler<ContentMeta> = (data) => {
    updateCustomContent$.mutate(data)
  }

  const onEnabledToggle = () => {
    updateFlags$.mutate({
      ...featureFlags,
      [FeatureFlag.AboutPage]: !aboutPageEnabled,
    })
  }

  return (
    <Stack gap={2}>
      <Stack
        component={Paper}
        sx={{ padding: 2 }}
        direction="row"
        alignItems="center"
      >
        <Box flexGrow={1}>
          <Typography variant="h2">About Page</Typography>
        </Box>

        <Box>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch checked={aboutPageEnabled} onChange={onEnabledToggle} />
              }
              label="Enabled"
            />
          </FormGroup>
        </Box>

        <Box>
          {updateCustomContent$.isIdle && (
            <Button
              size="small"
              variant="contained"
              onClick={handleSubmit(onFormSave)}
            >
              Save
            </Button>
          )}

          {updateCustomContent$.isPending && (
            <Button size="small" variant="contained" disabled>
              Saving
            </Button>
          )}

          {updateCustomContent$.isSuccess && (
            <Button
              size="small"
              variant="outlined"
              onClick={handleSubmit(onFormSave)}
            >
              Saved
            </Button>
          )}
        </Box>
      </Stack>

      <Stack gap={2} direction="row">
        <Paper sx={{ flexGrow: 1, padding: 2 }}>
          <Controller
            control={control}
            name="about"
            render={({ field }) => (
              <MarkdownEditor
                placeholder={"Description"}
                value={field.value || ""}
                onChange={field.onChange}
              />
            )}
          />
        </Paper>
      </Stack>
    </Stack>
  )
}
