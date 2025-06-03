"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { clientSchema, ClientFormData } from "@/lib/validators/clientSchema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export default function ClientForm() {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema)
  })

  const mutation = useMutation({
    mutationFn: async (data: ClientFormData) => {
      const response = await axios.post("http://localhost:3001/clients", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] })
      reset()
    }
  })

  function onSubmit(data: ClientFormData) {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Nome</label>
        <input {...register("name")} className="border p-2 w-full" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label>E-mail</label>
        <input {...register("email")} className="border p-2 w-full" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label>
          <input type="checkbox" {...register("status")} />
          Ativo?
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {isSubmitting ? "Salvando..." : "Cadastrar"}
      </button>
    </form>
  )
}
