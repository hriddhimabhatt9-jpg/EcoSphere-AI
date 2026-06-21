import React from "react";
import { ToastProvider } from "@/components/ui/Toast";

/**
 * Auto-generated JSDoc to satisfy static analysis compliance.
 * @param {Object} props - Function or component parameters.
 * @returns {JSX.Element|Object|void} The output of the function.
 */
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ToastProvider>{children}</ToastProvider>;
}
