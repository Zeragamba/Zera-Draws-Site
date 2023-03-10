import { TagData } from './TagData'
import { ImageData } from './ImageData'

export interface PostData {
  id: string
  date: string
  position: number
  title: string
  slug: string
  description: string
  tags: TagData[]
  images: ImageData[]
  released: boolean
  scheduled: string | null
}
