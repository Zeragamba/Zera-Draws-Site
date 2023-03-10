import { ImageData } from '../Images/ImageData'
import { TagData } from '../Tags/TagData'

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

export enum EditablePostFields {
  title = 'title',
  date = 'date',
  slug = 'slug',
  description = 'description',
  position = 'position',
  released = 'released',
  tags = 'tags',
  scheduled = 'scheduled'
}

export type EditablePost = Pick<PostData, EditablePostFields>

export function postToFormData(post: Partial<EditablePost>): FormData {
  const formData = new FormData()

  const editableFields: string[] = Object.values(EditablePostFields)
  const allowedFields = Object.entries(post)
    .filter(([ prop ]) => editableFields.includes(prop))

  allowedFields.forEach(([ prop, value ]) => {
    switch (prop) {
      case 'tags':
        value = value as TagData[]

        if (value.length === 0) {
          formData.append('tags', '__none__')
        } else {
          value.forEach((tag) => {
            formData.append('tags[]', tag.id)
          })
        }
        break
      default:
        formData.set(`post[${prop}]`, String(value))
    }
  })

  return formData
}
