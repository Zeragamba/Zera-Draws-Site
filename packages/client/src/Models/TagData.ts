export interface TagData {
  id: string
  name: string
  slug: string
  num_posts: number
  created_at: string
  updated_at: string
  featured: boolean
}

type EditableFields = "name" | "slug" | "featured"

export type EditableTagData = Pick<TagData, EditableFields>

export function buildTagData(): TagData {
  return {
    id: "",
    created_at: "",
    name: "",
    num_posts: 0,
    slug: "",
    updated_at: "",
    featured: false,
  }
}
