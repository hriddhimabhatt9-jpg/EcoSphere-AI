import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Leaf, Zap, Car } from "lucide-react";

export function StatsGrid({ score }: { score: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card variant="elevated" className="p-6 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent-green/10 rounded-full blur-xl" />
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="p-2 bg-accent-green-dim text-accent-green rounded-lg">
            <Leaf size={20} />
          </div>
          <Badge variant="green">+12% vs last month</Badge>
        </div>
        <div className="relative z-10">
          <h4 className="text-text-secondary text-sm font-medium mb-1">EcoScore</h4>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-display font-bold text-text-primary">{score}</span>
            <span className="text-text-muted text-sm">/ 100</span>
          </div>
        </div>
      </Card>

      <Card variant="elevated" className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 bg-accent-amber-dim text-accent-amber rounded-lg">
            <Zap size={20} />
          </div>
        </div>
        <div>
          <h4 className="text-text-secondary text-sm font-medium mb-1">Energy Saved</h4>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-text-primary">124</span>
            <span className="text-text-muted text-sm">kWh</span>
          </div>
        </div>
      </Card>

      <Card variant="elevated" className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 bg-accent-blue-dim text-accent-blue rounded-lg">
            <Car size={20} />
          </div>
        </div>
        <div>
          <h4 className="text-text-secondary text-sm font-medium mb-1">Miles Avoided</h4>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-text-primary">85</span>
            <span className="text-text-muted text-sm">miles</span>
          </div>
        </div>
      </Card>

      <Card variant="elevated" className="p-6 bg-gradient-eco border-transparent text-white">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        <div>
          <h4 className="text-white/80 text-sm font-medium mb-1">Current Streak</h4>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-white">12</span>
            <span className="text-white/70 text-sm">days</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
