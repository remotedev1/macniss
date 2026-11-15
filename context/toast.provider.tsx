"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { toast } from "sonner";

type ToastContextValue = {
  success: (message: string, description?: string) => void;
  error: (message: string, description?: string) => void;
  info: (message: string, description?: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const success = (message: string, description?: string) => toast.success(message, { description });
  const error = (message: string, description?: string) => toast.error(message, { description });
  const info = (message: string, description?: string) => toast(message, { description });
  return <ToastContext.Provider value={{ success, error, info }}>{children}</ToastContext.Provider>;
}

export function useToastContext(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToastContext must be used within a ToastProvider");
  return context;
}
