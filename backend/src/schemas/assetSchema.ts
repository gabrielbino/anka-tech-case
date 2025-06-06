import { z } from 'zod'

export const assetSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  value: z.number().positive(),
  clientId: z.number().int().positive(),
})

export type AssetFormData = z.infer<typeof assetSchema>