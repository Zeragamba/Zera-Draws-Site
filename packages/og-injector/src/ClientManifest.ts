export type ClientManifest = {
  name: string
  description: string
  icons: Array<{
    src: string
    type: string
    sizes: string
  }>
  start_url: string
  display: string
  theme_color: string
  background_color: string
}
