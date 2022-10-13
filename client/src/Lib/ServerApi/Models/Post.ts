import { Image } from './Image'

export interface Post {
  id: string
  date: string
  order: number
  title: string
  slug: string
  description: string
  tags: string[]
  images: Image[]
}

type EditableFields =
  | 'title'
  | 'date'
  | 'slug'
  | 'description'

export type EditablePost = Pick<Post, EditableFields>
