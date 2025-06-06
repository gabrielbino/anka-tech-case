"use client"

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"

interface ConfirmDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  clientName?: string
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  clientName
}: ConfirmDeleteModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white p-6 rounded shadow-md max-w-md w-full">
          <DialogTitle className="text-lg font-semibold mb-4">Confirmar Exclusão</DialogTitle>
          <p>Você tem certeza que deseja excluir <strong>{clientName ?? 'este cliente'}</strong>?</p>
          <div className="flex justify-end gap-2 pt-6">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Cancelar
            </button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Excluir
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}