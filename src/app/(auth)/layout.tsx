import React from "react";
import Link from "next/link";
import { ToastProvider } from "@/components/ui/Toast";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col md:flex-row bg-bg-primary">
        {/* Left Side - Visual */}
        <div className="hidden md:flex md:w-1/2 lg:w-[55%] relative overflow-hidden bg-bg-secondary border-r border-border items-center justify-center p-12">
          <div className="absolute inset-0 bg-gradient-hero opacity-30 pointer-events-none" />
          
          <div className="relative z-10 max-w-lg text-center animate-fade-in-up">
            <Link href="/" className="inline-flex items-center gap-2 font-display text-3xl font-bold tracking-tight mb-8">
              <span>🌍</span>
              <span className="text-text-primary">
                Eco<span className="text-accent-green">Sphere</span> AI
              </span>
            </Link>
            
            <h1 className="text-4xl font-display font-bold leading-tight mb-6">
              Small actions today,<br />
              <span className="bg-gradient-eco-vibrant bg-clip-text text-transparent">massive impact tomorrow.</span>
            </h1>
            
            <p className="text-lg text-text-secondary leading-relaxed mb-12">
              Join thousands of people tracking, understanding, and reducing their carbon footprint through AI-powered insights and gamification.
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="bg-bg-tertiary border border-border rounded-xl p-4 flex flex-col gap-2">
                <span className="text-2xl">🤖</span>
                <h3 className="font-semibold text-text-primary">AI Coaching</h3>
                <p className="text-sm text-text-secondary">Personalized plans to reduce your footprint.</p>
              </div>
              <div className="bg-bg-tertiary border border-border rounded-xl p-4 flex flex-col gap-2">
                <span className="text-2xl">🏆</span>
                <h3 className="font-semibold text-text-primary">Gamification</h3>
                <p className="text-sm text-text-secondary">Earn XP, levels, and badges as you progress.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Auth Form */}
        <div className="w-full md:w-1/2 lg:w-[45%] flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md animate-fade-in">
            {/* Mobile Logo */}
            <div className="md:hidden flex justify-center mb-8">
              <Link href="/" className="inline-flex items-center gap-2 font-display text-2xl font-bold tracking-tight">
                <span>🌍</span>
                <span className="text-text-primary">
                  Eco<span className="text-accent-green">Sphere</span> AI
                </span>
              </Link>
            </div>
            
            {children}
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}
