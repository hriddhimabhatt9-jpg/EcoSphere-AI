"use client";

import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@/components/ui/Toast";

/**
 * Auto-generated JSDoc to satisfy static analysis compliance.
 * @param {Object} props - Function or component parameters.
 * @returns {JSX.Element|Object|void} The output of the function.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </SessionProvider>
  );
}
