"use client"

import { Dialog } from "@headlessui/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { clientSchema, ClientFormData } from "@/lib/validators/clientSchema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useEffect } from "react"
import { useToast } from "@/lib/hooks/use-toast"

interface EditClientModalProps {
  isOpen: boolean
  onClose: () => void
  client: {
    id: number
    name: string
    email: string
    status: boolean
  } | null
}

export default function EditClientModal({ isOpen, onClose, client }: EditClientModalProps) {
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      email: "",
      status: false
    }
  })

  useEffect(() => {
    if (client) {
      reset({
        name: client.name,
        email: client.email,
        status: client.status
      })
    }
  }, [client, reset])

  const mutation = useMutation({
    mutationFn: async (data: ClientFormData) => {
      const response = await axios.put(`http://localhost:3001/clients/${client?.id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] })
      showToast({
        title: "Cliente atualizado",
        description: "As informações foram salvas com sucesso.",
        variant: "success"
      })
      onClose()
    },
    onError: () => {
      showToast({
        title: "Erro ao atualizar",
        description: "Ocorreu um erro ao tentar salvar as alterações.",
        variant: "error"
      })
    }
  })

  function onSubmit(data: ClientFormData) {
    mutation.mutate(data)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded shadow-md max-w-md w-full">
          <Dialog.Title className="text-lg font-semibold mb-4">Editar Cliente</Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label>Nome</label>
              <input {...register("name")} className="border p-2 w-full" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <label>E-mail</label>
              <input {...register("email")} className="border p-2 w-full" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input type="checkbox" {...register("status")} />
                Ativo?
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-300">
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {isSubmitting ? "Salvando..." : "Salvar alterações"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
