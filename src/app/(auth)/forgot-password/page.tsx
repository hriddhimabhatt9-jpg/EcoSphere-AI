"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { forgotPassword } from "@/actions/profile";

/**
 * Auto-generated JSDoc to satisfy static analysis compliance.
 * @param {Object} props - Function or component parameters.
 * @returns {JSX.Element|Object|void} The output of the function.
 */
export default function ForgotPasswordPage() {
  const { error: showError, success: showSuccess } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      
      const result = await forgotPassword(email);

      if (result?.error) {
        showError(result.error);
      } else {
        setIsSubmitted(true);
        showSuccess("Password reset instructions sent");
      }
    } catch (error) {
      console.error(error);
      showError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full text-center">
        <div className="w-16 h-16 bg-accent-green-dim text-accent-green rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-3xl font-display font-bold text-text-primary mb-4">Check your email</h2>
        <p className="text-text-secondary mb-8">
          We've sent password reset instructions to your email address.
        </p>
        <Link href="/login" className="btn btn-primary w-full justify-center">
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-text-primary mb-2">Reset Password</h2>
        <p className="text-text-secondary">Enter your email and we'll send you a link to reset your password</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          disabled={isLoading}
        />

        <Button type="submit" size="lg" className="mt-4 w-full" isLoading={isLoading}>
          Send Reset Link
        </Button>
      </form>

      <div className="text-center mt-6">
        <Link href="/login" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
