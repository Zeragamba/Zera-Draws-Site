import { SxProps } from '@mui/material'

import backgroundImage from './Assets/AppBackground.png'

export const appStyles: SxProps = {
  overflow: 'auto',
  width: '100vw',
  height: '100vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundColor: 'hsl(0, 0%, 70%)',
}
