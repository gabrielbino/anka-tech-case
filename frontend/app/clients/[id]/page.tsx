"use client"

import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import AssetFormForClient from "@/components/asset/AssetFormForClient"

export default function ClientAssetsPage() {
  const { id } = useParams()

  const { data: client, isLoading, isError } = useQuery({
    queryKey: ["client", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3001/clients/${id}`)
      return res.data
    }
  })

  const { data: assets } = useQuery({
    queryKey: ["clientAssets", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3001/clients/${id}/assets`)
      return res.data
    },
    enabled: !!id
  })

  if (isLoading) return <p className="text-gray-600">Carregando cliente...</p>
  if (isError || !client) return <p className="text-red-500">Erro ao carregar cliente</p>

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold">{client.name}</h1>
        <p className="text-gray-600">{client.email}</p>
        <AssetFormForClient clientId={Number(id)} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Ativos Financeiros</h2>
        {!assets ? (
          <p className="text-gray-600">Carregando ativos...</p>
        ) : assets.length === 0 ? (
          <p className="text-gray-500">Nenhum ativo cadastrado para este cliente.</p>
        ) : (
          <ul className="space-y-2">
            {assets.map((asset: any) => (
              <li key={asset.id} className="border p-3 rounded-md">
                <div className="font-medium">{asset.name}</div>
                <div className="text-sm text-gray-600">
                  Valor atual: R$ {asset.value.toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
