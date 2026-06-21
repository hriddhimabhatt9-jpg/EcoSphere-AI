"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Sparkles, Loader2 } from "lucide-react";

import { Badge } from "@/components/ui/Badge";

const CoachChat = dynamic(() => import("@/components/dashboard/CoachChat").then(m => m.CoachChat), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-bg-secondary rounded-xl border border-border">
      <Loader2 className="w-8 h-8 animate-spin text-accent-purple" />
    </div>
  )
});

/**
 * AICoachPage Component
 * 
 * Renders the AI Sustainability Coach interface, lazy-loading the chat component.
 * @returns {JSX.Element} The AI Coach page
 */
export default function AICoachPage() {
  return (
    <div className="h-[calc(100vh-var(--header-height)-2rem)] md:h-[calc(100vh-var(--header-height)-4rem)] flex flex-col animate-fade-in">
      <div className="mb-4">
        <h1 className="text-3xl font-display font-bold text-text-primary flex items-center gap-3">
          AI Sustainability Coach
          <Badge variant="purple" icon={<Sparkles size={12} />}>Beta</Badge>
        </h1>
        <p className="text-text-secondary">Personalized guidance based on your real-time data.</p>
      </div>
      <CoachChat />
    </div>
  );
}
