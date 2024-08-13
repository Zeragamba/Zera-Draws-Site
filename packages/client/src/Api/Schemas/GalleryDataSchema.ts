import z from "zod"

export const GalleryDataSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
})

export const GalleryResSchema = z
  .object({
    gallery: GalleryDataSchema,
  })
  .transform((res) => res.gallery)
