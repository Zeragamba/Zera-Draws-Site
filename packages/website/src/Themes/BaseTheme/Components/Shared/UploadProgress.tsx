import { Box, LinearProgress, LinearProgressProps, Stack, Typography } from '@mui/material'
import { FC } from 'react'

export type UploadProgressProps = LinearProgressProps & { value: number }

export const UploadProgress: FC<UploadProgressProps> = (props) => {
  return (
    <Stack direction={'row'} alignItems={'center'} gap={1}>
      <Box flexGrow={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35, textAlign: 'right' }}>
        <Typography variant="body2" color="text.secondary">
          {Math.round(props.value)}%
        </Typography>
      </Box>
    </Stack>
  )
}