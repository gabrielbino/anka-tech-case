"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useToast } from "@/lib/hooks/use-toast"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { assetSchema, AssetFormData } from "@/lib/validators/assetSchema"

type Props = {
  clientId: number
}

export default function AssetFormForClient({ clientId }: Props) {
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<AssetFormData>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      name: "",
      category: "",
      value: 0,
      clientId
    }
  })

  const { data: assets } = useQuery({
    queryKey: ["availableAssets"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/assets")
      return res.data
    }
  })

  const mutation = useMutation({
    mutationFn: async (data: AssetFormData) => {
      const response = await axios.post("http://localhost:3001/assets", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientAssets", clientId] })
      reset({ name: "", category: "", value: 0, clientId })
      showToast({
        title: "Ativo cadastrado",
        description: "O ativo foi vinculado ao cliente com sucesso.",
        variant: "success"
      })
    },
    onError: () => {
      showToast({
        title: "Erro ao cadastrar",
        description: "Verifique os dados informados.",
        variant: "error"
      })
    }
  })

  function onSubmit(data: AssetFormData) {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
      <h2 className="text-lg font-semibold">Vincular Ativo ao Cliente</h2>

      <div>
        <label>Selecione o Ativo</label>
        <select
          {...register("name")}
          className="border p-2 w-full"
          onChange={(e) => {
            const selected = assets?.find((a: any) => a.name === e.target.value)
            setValue("name", selected?.name || "")
            setValue("category", selected?.category || "")
            setValue("value", selected?.value || 0)
          }}
        >
          <option value="">Selecione um ativo</option>
          {assets?.map((asset: any) => (
            <option key={asset.name} value={asset.name}>
              {asset.name} – {asset.category}
            </option>
          ))}
        </select>
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label>Valor (R$)</label>
        <input
          type="number"
          step="any"
          {...register("value", { valueAsNumber: true })}
          className="border p-2 w-full"
        />
        {errors.value && <p className="text-red-500 text-sm">{errors.value.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isSubmitting ? "Salvando..." : "Vincular Ativo"}
      </button>
    </form>
  )
}
