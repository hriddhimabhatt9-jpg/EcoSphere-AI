import React from "react";
import { ToastProvider } from "@/components/ui/Toast";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ToastProvider>{children}</ToastProvider>;
}
