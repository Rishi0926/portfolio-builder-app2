"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode, useCallback } from "react"
import { ToastProvider as RadixToastProvider, ToastViewport } from "@radix-ui/react-toast"
import { Toast } from "../components/ui/toaster"

interface ToastContextType {
  showToast: (title: string, description?: string, variant?: "default" | "destructive" | "success" | "warning") => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<
    Array<{
      id: string
      title: string
      description?: string
      variant?: "default" | "destructive" | "success" | "warning"
    }>
  >([])

  const showToast = useCallback(
    (title: string, description?: string, variant?: "default" | "destructive" | "success" | "warning") => {
      const id = Math.random().toString(36).substring(2, 9)
      setToasts((prev) => [...prev, { id, title, description, variant }])
    },
    [],
  )

  const handleRemoveToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      <RadixToastProvider>
        {children}
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            title={toast.title}
            description={toast.description}
            variant={toast.variant}
            onOpenChange={(open) => {
              if (!open) handleRemoveToast(toast.id)
            }}
          />
        ))}
        <ToastViewport />
      </RadixToastProvider>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
