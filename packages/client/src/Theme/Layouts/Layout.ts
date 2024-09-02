import { FC, ReactNode } from "react"

export interface LayoutProps {
  className?: string
  children?: ReactNode
}

export const LayoutStyles = {
  header: {
    zIndex: "appBar",
    position: "sticky",
    top: 0,
    width: "100%",
  },

  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    overflow: "auto",
    overflowY: "scroll",
  },

  main: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: 2,
  },

  content: {
    width: "100%",
    flexGrow: 1,
    maxWidth: 1200,
  },
}

export type Layout<Props = object> = FC<LayoutProps & Props>
