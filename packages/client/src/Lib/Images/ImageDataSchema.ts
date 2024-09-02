import z from "zod"

export const ImageDataSchema = z.object({
  id: z.string().uuid(),
  position: z.number().int(),
  filename: z.string(),
  srcs: z.object({ full: z.string() }).and(z.record(z.string())),
  height: z.number().int().optional(),
  width: z.number().int().optional(),
  mime_type: z.string().optional(),
  ext: z.string().optional(),
  file: z.instanceof(File).optional(),
})
