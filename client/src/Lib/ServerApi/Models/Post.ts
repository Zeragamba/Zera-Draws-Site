import { Image } from './Image'
import { Tag } from './Tag'

export interface Post {
  id: string
  date: string
  order: number
  title: string
  slug: string
  description: string
  tags: Tag[]
  images: Image[]
  released: boolean
}

type EditableFields =
  | 'title'
  | 'date'
  | 'slug'
  | 'description'
  | 'released'

export type EditablePost = Pick<Post, EditableFields>
