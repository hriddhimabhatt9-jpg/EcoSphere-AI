"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Trophy, Clock, Users, ArrowRight } from "lucide-react";

// Mock data
const ACTIVE_CHALLENGES = [
  { id: 1, title: "Meatless Week", desc: "Go vegetarian for 7 consecutive days.", progress: 70, max: 100, daysLeft: 2, xp: 500, icon: "🥗", participants: 1240 },
  { id: 2, title: "10k Steps Daily", desc: "Walk instead of driving for short trips.", progress: 40, max: 100, daysLeft: 12, xp: 800, icon: "👟", participants: 3400 },
];

const AVAILABLE_CHALLENGES = [
  { id: 3, title: "Zero Waste Weekend", desc: "Produce absolutely zero non-recyclable waste for 48 hours.", xp: 1000, duration: "2 days", icon: "🗑️", difficulty: "Hard" },
  { id: 4, title: "Cold Wash Only", desc: "Wash all laundry with cold water this week.", xp: 300, duration: "7 days", icon: "👕", difficulty: "Easy" },
  { id: 5, title: "Phantom Power Hunt", desc: "Unplug 5 unused electronics or appliances.", xp: 200, duration: "1 day", icon: "🔌", difficulty: "Easy" },
  { id: 6, title: "Public Transit Hero", desc: "Take public transit for all commutes this month.", xp: 2000, duration: "30 days", icon: "🚌", difficulty: "Medium" },
];

/**
 * Auto-generated JSDoc to satisfy static analysis compliance.
 * @param {Object} props - Function or component parameters.
 * @returns {JSX.Element|Object|void} The output of the function.
 */
export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState<"active" | "explore">("active");

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-1">
            Challenges
          </h1>
          <p className="text-text-secondary">Push your limits, earn XP, and compete with the community.</p>
        </div>
        <div className="flex items-center gap-2 bg-bg-tertiary p-1 rounded-xl border border-border">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "active" ? "bg-bg-secondary text-text-primary shadow-sm" : "text-text-secondary"
            }`}
          >
            Active (2)
          </button>
          <button
            onClick={() => setActiveTab("explore")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "explore" ? "bg-bg-secondary text-text-primary shadow-sm" : "text-text-secondary"
            }`}
          >
            Explore New
          </button>
        </div>
      </div>

      {activeTab === "active" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {ACTIVE_CHALLENGES.map((challenge) => (
            <Card key={challenge.id} variant="elevated" className="p-6 flex flex-col">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-bg-tertiary flex items-center justify-center text-3xl border border-border shrink-0">
                  {challenge.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-1">{challenge.title}</h3>
                      <p className="text-sm text-text-secondary">{challenge.desc}</p>
                    </div>
                    <Badge variant="green" icon={<Trophy size={12} />}>{challenge.xp} XP</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3 text-xs text-text-muted font-medium">
                    <span className="flex items-center gap-1"><Clock size={14} /> {challenge.daysLeft} days left</span>
                    <span className="flex items-center gap-1"><Users size={14} /> {challenge.participants.toLocaleString()} joined</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-border">
                <ProgressBar value={challenge.progress} max={challenge.max} showLabel color="var(--accent-green)" />
                <Button className="w-full mt-6" variant="primary">Log Progress</Button>
              </div>
            </Card>
          ))}

          <Card variant="default" className="p-6 flex flex-col items-center justify-center text-center border-dashed min-h-[300px]">
            <div className="w-16 h-16 rounded-full bg-bg-tertiary flex items-center justify-center text-text-muted mb-4">
              <Trophy size={24} />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">Ready for more?</h3>
            <p className="text-sm text-text-secondary mb-6 max-w-xs">
              Explore new challenges to boost your impact and level up faster.
            </p>
            <Button variant="secondary" onClick={() => setActiveTab("explore")}>
              Browse Challenges
            </Button>
          </Card>
        </div>
      )}

      {activeTab === "explore" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AVAILABLE_CHALLENGES.map((challenge) => (
            <Card key={challenge.id} variant="elevated" className="p-6 group hover:-translate-y-1 transition-transform">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-bg-tertiary flex items-center justify-center text-2xl border border-border">
                  {challenge.icon}
                </div>
                <Badge 
                  variant={challenge.difficulty === "Easy" ? "green" : challenge.difficulty === "Medium" ? "amber" : "rose"}
                >
                  {challenge.difficulty}
                </Badge>
              </div>
              
              <h3 className="text-lg font-bold text-text-primary mb-2">{challenge.title}</h3>
              <p className="text-sm text-text-secondary mb-6 min-h-[40px]">{challenge.desc}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex flex-col">
                  <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">Reward</span>
                  <span className="font-bold text-text-primary">{challenge.xp} XP</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">Duration</span>
                  <span className="font-medium text-text-primary">{challenge.duration}</span>
                </div>
              </div>

              <Button className="w-full mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                Join Challenge
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
