import { FC, PropsWithChildren } from "react"
import { SiteMetaContext } from "./SiteMetaContext"

interface SiteMetaProviderProps extends PropsWithChildren {
  name: string
  copyright: string
}

export const SiteMetaProvider: FC<SiteMetaProviderProps> = ({
  name,
  copyright,
  children,
}) => {
  return (
    <SiteMetaContext.Provider
      value={{ siteName: name, siteCopyright: copyright }}
      children={children}
    />
  )
}
