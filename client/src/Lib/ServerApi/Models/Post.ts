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
}

type EditableFields =
  | 'title'
  | 'date'
  | 'slug'
  | 'description'

export type EditablePost = Pick<Post, EditableFields>
