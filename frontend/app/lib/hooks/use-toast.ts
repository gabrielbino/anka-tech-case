import { create } from "zustand"

type ToastVariant = "default" | "success" | "error" | "warning"

type Toast = {
  title: string
  description?: string
  variant?: ToastVariant
}

type ToastStore = {
  toast: Toast | null
  showToast: (toast: Toast) => void
  hideToast: () => void
}

export const useToast = create<ToastStore>((set) => ({
  toast: null,
  showToast: (toast: Toast) => set({ toast }),
  hideToast: () => set({ toast: null }),
}))
