import { parseISO } from 'date-fns'
import z from 'zod'

export const PasskeyDataSchema = z.object({
  name: z.string().min(1),
  createdAt: z.string().datetime()
    .transform((timestamp) => parseISO(timestamp))
    .optional(),
})

export type PasskeyData = z.infer<typeof PasskeyDataSchema>

export const PasskeyResSchema = z.object({
  passkey: PasskeyDataSchema,
})

export const PasskeyListResSchema = z.object({
  passkeys: PasskeyDataSchema.array(),
})

export const PasskeyLoginChallengeSchema = z.object({
  challenge: z.string(),
  timeout: z.number(),
})

export const PasskeyCreateChallengeSchema = z.object({
  challenge: z.string(),
  excludeCredentials: z.object({
    type: z.literal('public-key'),
    id: z.string(),
  }).array(),
  pubKeyCredParams: z.object({
    type: z.literal('public-key'),
    alg: z.number(),
  }).array(),
  rp: z.object({
    name: z.string(),
  }),
  timeout: z.number(),
  user: z.object({
    displayName: z.string(),
    id: z.string(),
    name: z.string(),
  }),
})
