"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface Client {
  id: number
  name: string
  email: string
  status: boolean
}

export default function ClientList() {
  const { data, isLoading, error } = useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3001/clients')
      return response.data
    }
  })

  if (isLoading) return <p>Carregando clientes...</p>
  if (error) return <p>Erro ao carregar os clientes.</p>

  return (
    <div className="space-y-4">
      {data?.length ? (
        data.map(client => (
          <div key={client.id} className="border p-4 rounded shadow-sm">
            <p><strong>Nome:</strong> {client.name}</p>
            <p><strong>E-mail:</strong> {client.email}</p>
            <p><strong>Status:</strong> {client.status ? "Ativo" : "Inativo"}</p>
          </div>
        ))
      ) : (
        <p>Nenhum cliente cadastrado ainda.</p>
      )}
    </div>
  )
}
