import { SxProps } from '@mui/material'

import backgroundImage from '../../Assets/dark_geometric.png'

export const AppStyles: SxProps = {
  overflow: 'auto',
  width: '100vw',
  height: '100vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundColor: 'hsl(0, 0%, 70%)',
}