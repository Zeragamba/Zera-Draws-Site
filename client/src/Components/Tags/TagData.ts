export interface TagData {
  id: string
  name: string
  slug: string
  num_posts: number
  created_at: string
  updated_at: string
}

type EditableFields =
  | 'name'
  | 'slug'

export type EditableTagData = Pick<TagData, EditableFields>
