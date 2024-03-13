import z from 'zod'

export const tagDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  num_posts: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  featured: z.boolean(),
})
