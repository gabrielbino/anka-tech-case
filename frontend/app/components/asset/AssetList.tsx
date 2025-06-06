"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface Asset {
  id: number
  name: string
  category: string
  value: number
}

export default function AssetList() {
  const { data, isLoading, error } = useQuery<Asset[]>({
    queryKey: ["assets"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3001/assets")
      return response.data
    }
  })

  if (isLoading) return <p>Carregando ativos...</p>
  if (error) return <p>Erro ao carregar os ativos financeiros.</p>

  return (
    <div className="space-y-4 mt-6">
      {data?.length ? (
        data.map(asset => (
          <div
            key={asset.id}
            className="border p-4 rounded shadow-sm bg-white flex justify-between items-center"
          >
            <div>
              <p><strong>Nome:</strong> {asset.name}</p>
              <p><strong>Categoria:</strong> {asset.category}</p>
              <p><strong>Valor:</strong> R$ {asset.value.toFixed(2)}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Nenhum ativo financeiro cadastrado ainda.</p>
      )}
    </div>
  )
}