"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full max-w-sm items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:fade-in-80 data-[state=closed]:slide-out-to-right-20 data-[state=open]:slide-in-from-top-full sm:data-[state=open]:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "bg-white text-black",
        success: "bg-green-600 text-white",
        error: "bg-red-600 text-white",
        warning: "bg-yellow-500 text-white"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState<{
    title: string
    description?: string
    variant?: "default" | "success" | "error" | "warning"
  } | null>(null)

  const showToast = (data: typeof message) => {
    setMessage(data)
    setOpen(false)
    setTimeout(() => setOpen(true), 10)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastPrimitives.Provider swipeDirection="right">
        {children}
        <ToastPrimitives.Root
          open={open}
          onOpenChange={setOpen}
          className={cn(toastVariants({ variant: message?.variant || "default" }))}
        >
          <div className="grid gap-1">
            <ToastPrimitives.Title className="text-sm font-semibold">{message?.title}</ToastPrimitives.Title>
            {message?.description && (
              <ToastPrimitives.Description className="text-sm opacity-90">
                {message.description}
              </ToastPrimitives.Description>
            )}
          </div>
        </ToastPrimitives.Root>
        <ToastPrimitives.Viewport className="fixed bottom-4 right-4 z-50 w-[320px] max-w-full" />
      </ToastPrimitives.Provider>
    </ToastContext.Provider>
  )
}

const ToastContext = React.createContext<{
  showToast: (data: {
    title: string
    description?: string
    variant?: "default" | "success" | "error" | "warning"
  }) => void
} | null>(null)

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) throw new Error("useToast must be used inside ToastProvider")
  return context
}