import React from 'react'
import { createRoot } from 'react-dom/client'

import { zeraDarkTheme } from '././Themes/ZeraDark/ZeraDarkTheme'
import { App } from './App/App'
import reportWebVitals from './report-web-vitals'

const rootEle = document.getElementById('root') as Element
const root = createRoot(rootEle)
root.render(<App theme={zeraDarkTheme} />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
