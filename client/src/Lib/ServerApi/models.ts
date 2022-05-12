export interface Picture {
  id: string
  date: string
  order: number
  title: string
  srcs: {
    [size: string]: string
  }
  height: number
  width: number
  tags?: string[]
}
