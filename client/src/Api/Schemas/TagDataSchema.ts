import z from 'zod'

export const TagDataSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  num_posts: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  featured: z.boolean(),
})

export const TagResSchema = z.object({
  tag: TagDataSchema,
}).transform((data) => data.tag)

export const TagListResSchema = z.object({
  tags: z.array(TagDataSchema),
}).transform((data) => data.tags)
