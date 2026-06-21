"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="max-w-md w-full p-8 bg-bg-secondary border border-border rounded-2xl shadow-xl text-center">
        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-display font-bold text-text-primary mb-2">Something went wrong</h2>
        <p className="text-text-secondary mb-8">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => window.location.reload()} variant="secondary">
            Reload Page
          </Button>
          <Button onClick={() => reset()}>
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
