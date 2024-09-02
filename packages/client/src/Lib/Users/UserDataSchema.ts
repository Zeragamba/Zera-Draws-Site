import z from "zod"

export const UserDataSchema = z.object({
  username: z.string(),
  email: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  admin: z.boolean(),
})

export const UserResSchema = z
  .object({
    user: UserDataSchema,
  })
  .transform((data) => data.user)
