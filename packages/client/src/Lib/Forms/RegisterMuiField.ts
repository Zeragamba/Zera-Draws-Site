import { TextFieldProps } from "@mui/material/TextField"
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form"

type FieldProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>
  fieldState: ControllerFieldState
}

export function muiField<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  field,
  fieldState,
}: FieldProps<TFieldValues, TName>): Partial<TextFieldProps> {
  return {
    onChange: field.onChange,
    onBlur: field.onBlur,
    name: field.name,
    inputRef: field.ref,
    value: field.value,
    error: !!fieldState.error,
  }
}
