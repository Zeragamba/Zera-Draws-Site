import { Image } from '../Images/Image'
import { Tag } from '../Tags/Tag'

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

export enum EditablePostFields {
  title = 'title',
  date = 'date',
  slug = 'slug',
  description = 'description',
  released = 'released',
}

export type EditablePost = Pick<Post, EditablePostFields>
