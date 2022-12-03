import { TextFieldProps } from '@mui/material/TextField'
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

export function muiField<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>(
  field: ControllerRenderProps<TFieldValues, TName>,
): Partial<TextFieldProps> {
  return {
    onChange: field.onChange,
    onBlur: field.onBlur,
    name: field.name,
    inputRef: field.ref,
    value: field.value,
  }
}
