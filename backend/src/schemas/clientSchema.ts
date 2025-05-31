import { z } from 'zod'

export const createClientSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  status: z.boolean()
})

export const updateClientSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  status: z.boolean().optional()
})
