"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Users, Info, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

// Mock data
const TWIN_DATA = {
  you: {
    total: 8.2,
    transport: 3.1,
    energy: 2.8,
    food: 1.5,
    shopping: 0.8,
  },
  twin: {
    total: 6.5,
    transport: 1.8,
    energy: 2.5,
    food: 1.2,
    shopping: 1.0,
  },
  insights: [
    "Your Carbon Twin drives an EV, saving 1.3 tons CO₂e in transport annually.",
    "You are doing better in shopping habits than 60% of similar profiles.",
    "Switching to a green energy plan would close the gap with your Twin by 50%."
  ]
};

export default function CarbonTwinPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(true); // Default true for demo

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2 flex items-center gap-3">
          AI Carbon Twin
          <Badge variant="blue" icon={<Users size={12} />}>Beta</Badge>
        </h1>
        <p className="text-text-secondary max-w-2xl">
          Our AI finds a user with a similar demographic, location, and lifestyle to yours—but with a lower carbon footprint. Learn from their habits to improve your own.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card variant="elevated" className="p-6 lg:col-span-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-hero opacity-10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="font-semibold text-text-primary text-xl">Footprint Comparison</h3>
            <span className="text-sm font-medium text-text-muted">Tons CO₂e / year</span>
          </div>

          <div className="flex flex-col gap-6 relative z-10">
            <div className="flex items-center justify-between p-4 bg-bg-tertiary rounded-xl border border-border">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-text-secondary mb-1">Your Total</span>
                <span className="text-3xl font-display font-bold text-text-primary">{TWIN_DATA.you.total}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">Vs</span>
                <div className="w-px h-8 bg-border" />
              </div>
              <div className="flex flex-col text-right">
                <span className="text-sm font-medium text-accent-blue mb-1">Your Twin's Total</span>
                <span className="text-3xl font-display font-bold text-accent-blue">{TWIN_DATA.twin.total}</span>
              </div>
            </div>

            <div className="space-y-5 mt-4">
              {[
                { label: "Transport", you: TWIN_DATA.you.transport, twin: TWIN_DATA.twin.transport, max: 5 },
                { label: "Home Energy", you: TWIN_DATA.you.energy, twin: TWIN_DATA.twin.energy, max: 5 },
                { label: "Food & Diet", you: TWIN_DATA.you.food, twin: TWIN_DATA.twin.food, max: 3 },
                { label: "Shopping", you: TWIN_DATA.you.shopping, twin: TWIN_DATA.twin.shopping, max: 2 },
              ].map((category, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-text-primary">{category.label}</span>
                    <div className="flex gap-4">
                      <span className="text-text-secondary">{category.you}</span>
                      <span className="text-accent-blue">{category.twin}</span>
                    </div>
                  </div>
                  <div className="relative h-2 w-full bg-bg-tertiary rounded-full overflow-hidden flex">
                    <div 
                      className="absolute top-0 left-0 h-full bg-text-muted opacity-30 rounded-full"
                      style={{ width: `${(category.you / category.max) * 100}%` }}
                    />
                    <div 
                      className="absolute top-0 left-0 h-full bg-accent-blue rounded-full opacity-80"
                      style={{ width: `${(category.twin / category.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <Card variant="elevated" className="p-6 bg-gradient-to-b from-accent-blue-dim to-bg-secondary border-accent-blue/20">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Activity size={18} className="text-accent-blue" /> AI Insights
            </h3>
            <ul className="flex flex-col gap-4">
              {TWIN_DATA.insights.map((insight, i) => (
                <li key={i} className="flex gap-3 text-sm text-text-secondary leading-relaxed">
                  <span className="text-accent-blue shrink-0 mt-0.5">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card variant="default" className="p-6">
            <h3 className="font-semibold text-text-primary mb-2">Sync with Twin</h3>
            <p className="text-sm text-text-secondary mb-4">
              Adopt a habit from your Twin to earn bonus XP and reduce the gap.
            </p>
            <div className="border border-border rounded-lg p-3 hover:border-accent-green hover:bg-bg-tertiary transition-colors cursor-pointer mb-3">
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium text-sm text-text-primary">Try Meatless Mondays</span>
                <Badge variant="green">+200 XP</Badge>
              </div>
              <p className="text-xs text-text-muted">Your twin saves 0.3 tons annually with this.</p>
            </div>
            <div className="border border-border rounded-lg p-3 hover:border-accent-green hover:bg-bg-tertiary transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium text-sm text-text-primary">Eco-Wash Cycle</span>
                <Badge variant="green">+100 XP</Badge>
              </div>
              <p className="text-xs text-text-muted">Your twin saves energy on laundry.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
