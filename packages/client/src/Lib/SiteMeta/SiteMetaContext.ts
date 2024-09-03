import { createContext, useContext } from "react"

export interface SiteMeta {
  siteName: string
  siteCopyright: string
}

export const SiteMetaContext = createContext<SiteMeta | null>(null)

export function useSiteMeta() {
  const siteMeta = useContext(SiteMetaContext)

  if (!siteMeta) {
    throw new Error("useSiteMeta must be used within a SiteMetaProvider")
  }

  return siteMeta
}

export function useSiteName() {
  return useSiteMeta().siteName
}

export function useSiteCopyright() {
  return useSiteMeta().siteCopyright
}
