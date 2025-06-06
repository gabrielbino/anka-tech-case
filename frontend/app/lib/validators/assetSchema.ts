import { z } from "zod"

export const assetSchema = z.object({
  name: z.string().min(1, "O nome do ativo é obrigatório"),
  value: z.number({
    required_error: "O valor é obrigatório",
  }).positive("O valor deve ser maior que zero"),
  category: z.string().min(1, "Categoria é obrigatória")
})

export type AssetFormData = z.infer<typeof assetSchema>