"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * ToastProvider — Global toast notification system.
 * Renders an accessible notification container with ARIA live region support.
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that can access the toast context
 * @returns {JSX.Element} The provider wrapper with notification container
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { ...toast, id }]);

      setTimeout(() => {
        removeToast(id);
      }, 5000);
    },
    [removeToast]
  );

  const success = useCallback((message: string, title?: string) => {
    addToast({ type: "success", message, title });
  }, [addToast]);

  const error = useCallback((message: string, title?: string) => {
    addToast({ type: "error", message, title });
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, success, error }}>
      {children}
      <div className="toast-container" role="region" aria-label="Notifications" aria-live="assertive">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="alert"
            aria-atomic="true"
            className={cn("toast", {
              "toast-success": toast.type === "success",
              "toast-error": toast.type === "error",
              "toast-warning": toast.type === "warning",
              "toast-info": toast.type === "info",
            })}
          >
            <div className="flex-shrink-0">
              {toast.type === "success" && <CheckCircle2 className="text-green-500" size={20} />}
              {toast.type === "error" && <XCircle className="text-rose-500" size={20} />}
              {toast.type === "warning" && <AlertCircle className="text-amber-500" size={20} />}
              {toast.type === "info" && <Info className="text-blue-500" size={20} />}
            </div>
            <div className="flex-1 mr-4">
              {toast.title && <h4 className="font-medium text-sm">{toast.title}</h4>}
              <p className="text-sm text-secondary">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-secondary hover:text-primary transition-colors"
              aria-label="Dismiss notification"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/**
 * useToast — Hook to access the global toast notification system.
 * Must be used within a ToastProvider component tree.
 * @returns {ToastContextType} Toast context with success, error, and addToast methods
 * @throws {Error} If used outside of a ToastProvider
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
