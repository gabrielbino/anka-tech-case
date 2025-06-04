"use client"

import { useState } from "react"
import EditClientModal from "./EditClientModal"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/lib/hooks/use-toast"

interface Client {
  id: number
  name: string
  email: string
  status: boolean
}

export default function ClientList() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const queryClient = useQueryClient()
  const { showToast } = useToast()

  const { data, isLoading, error } = useQuery<Client[]>({
    queryKey: ["clients"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3001/clients")
      return response.data
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:3001/clients/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] })
      showToast({
        title: "Cliente excluído",
        description: "O cliente foi removido com sucesso.",
        variant: "success"
      })
    },
    onError: () => {
      showToast({
        title: "Erro ao excluir",
        description: "Ocorreu um erro ao tentar excluir o cliente.",
        variant: "error"
      })
    }
  })

  function openEditModal(client: Client) {
    setSelectedClient(client)
    setIsModalOpen(true)
  }

  function closeModal() {
    setSelectedClient(null)
    setIsModalOpen(false)
  }

  if (isLoading) return <p>Carregando clientes...</p>
  if (error) return <p>Erro ao carregar os clientes.</p>

  return (
    <div className="space-y-4">
      {data?.length ? (
        data.map(client => (
          <div
            key={client.id}
            className="border p-4 rounded shadow-sm flex justify-between items-start flex-col sm:flex-row sm:items-center"
          >
            <div>
              <p><strong>Nome:</strong> {client.name}</p>
              <p><strong>E-mail:</strong> {client.email}</p>
              <p><strong>Status:</strong> {client.status ? "Ativo" : "Inativo"}</p>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <button
                onClick={() => openEditModal(client)}
                className="text-sm text-blue-600 underline"
              >
                Editar
              </button>
              <button
                onClick={() => deleteMutation.mutate(client.id)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Excluir
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Nenhum cliente cadastrado ainda.</p>
      )}

      {isModalOpen && selectedClient && (
        <EditClientModal
          client={selectedClient}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  )
}
