export interface Picture {
  id: string
  date: string
  order: number
  title: string
  srcs: {
    [size: string]: string
  }
  orientation: 'portrait' | 'landscape'
  height: number
  width: number
  tags?: string[]
}
