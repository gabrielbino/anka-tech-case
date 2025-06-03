import { z } from "zod"

export const clientSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),
  status: z.boolean()
})

export type ClientFormData = z.infer<typeof clientSchema>
