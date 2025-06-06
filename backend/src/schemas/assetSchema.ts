import { z } from 'zod'

export const assetSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  value: z.number()
})

export type AssetFormData = z.infer<typeof assetSchema>