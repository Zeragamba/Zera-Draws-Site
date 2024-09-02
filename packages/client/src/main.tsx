import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App/App"
import { zeraDarkTheme } from "./Theme/ZeraDarkTheme"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App theme={zeraDarkTheme} />
  </StrictMode>,
)
