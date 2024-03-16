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
