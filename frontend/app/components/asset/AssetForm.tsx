"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useToast } from "@/lib/hooks/use-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { assetSchema, AssetFormData } from "@/lib/validators/assetSchema"

export default function AssetForm() {
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<AssetFormData>({
    resolver: zodResolver(assetSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      category: "",
      value: 0
    },
    shouldUseNativeValidation: false
  })

  const mutation = useMutation({
    mutationFn: async (data: AssetFormData) => {
      const response = await axios.post("http://localhost:3001/assets", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] })
      reset()
      showToast({
        title: "Ativo cadastrado",
        description: "O ativo financeiro foi cadastrado com sucesso.",
        variant: "success"
      })
    },
    onError: () => {
      showToast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro ao tentar cadastrar o ativo.",
        variant: "error"
      })
    }
  })

  function onSubmit(data: AssetFormData) {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Nome</label>
        <input {...register("name")} className="border p-2 w-full" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label>Categoria</label>
        <input {...register("category")} className="border p-2 w-full" />
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>

      <div>
        <label>Valor (R$)</label>
        <input type="number" step="any" {...register("value", { valueAsNumber: true })} className="border p-2 w-full" />
        {errors.value && <p className="text-red-500 text-sm">{errors.value.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isSubmitting ? "Salvando..." : "Cadastrar"}
      </button>
    </form>
  )
}