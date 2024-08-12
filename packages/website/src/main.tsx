import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App/App'
import { zeraDarkTheme } from './Themes/ZeraDark/ZeraDarkTheme'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App theme={zeraDarkTheme} />
  </StrictMode>,
)
