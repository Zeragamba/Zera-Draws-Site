import {
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  TextField,
} from "@mui/material"
import { ChangeEventHandler, FC } from "react"
import { Control, useController } from "react-hook-form"

import { formatSlug } from "../../../../Lib"
import { TagData } from "../../../../Models"

interface TagFormProps {
  control: Control<{ tag: TagData }>
  disabled?: boolean
}

export const TagForm: FC<TagFormProps> = ({ control, disabled }) => {
  const nameCtrl = useController({
    control,
    name: "tag.name",
    rules: { required: true },
  })

  const slugCtrl = useController({
    control,
    name: "tag.slug",
    rules: { required: true },
  })

  const featuredCtrl = useController({
    control,
    name: "tag.featured",
  })

  const onNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newName = event.target.value
    nameCtrl.field.onChange(newName)

    if (!slugCtrl.fieldState.isDirty) {
      slugCtrl.field.onChange(formatSlug(newName || ""))
    }
  }

  return (
    <Stack gap={4}>
      <TextField
        label="name"
        value={nameCtrl.field.value}
        size="small"
        required
        onChange={onNameChange}
        disabled={disabled}
      />

      <TextField
        label="slug"
        value={slugCtrl.field.value}
        size="small"
        required
        onChange={(event) =>
          slugCtrl.field.onChange(formatSlug(event.target.value))
        }
        disabled={disabled}
      />

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={featuredCtrl.field.value}
              onChange={featuredCtrl.field.onChange}
            />
          }
          label="Featured"
        />
      </FormGroup>
    </Stack>
  )
}
