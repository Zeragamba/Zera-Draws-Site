import { SxProps, TextField } from "@mui/material"
import { grey } from "@mui/material/colors"
import { ChangeEventHandler, FC } from "react"

const styles: SxProps = {
  "& .MuiOutlinedInput-root": {
    borderColor: grey[500],
  },

  "& .MuiInputBase-input": {
    color: grey[200],
  },
}

interface SidebarTextFieldProps {
  value: string
  placeholder?: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const SidebarTextField: FC<SidebarTextFieldProps> = ({
  value,
  placeholder,
  onChange,
}) => {
  return (
    <TextField
      fullWidth
      size={"small"}
      sx={styles}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}
