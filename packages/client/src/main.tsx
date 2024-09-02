import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./Theme"

const rootElement = document.getElementById("root")!
createRoot(rootElement).render(<StrictMode children={<App />} />)
