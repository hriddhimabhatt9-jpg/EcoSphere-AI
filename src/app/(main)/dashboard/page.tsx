"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CarbonCharts } from "@/components/dashboard/CarbonCharts";
import { Plus, Leaf, Zap, Car, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

/**
 * Dashboard page - shows user's environmental impact overview.
 * Uses client-side session check to avoid server-side redirect loops.
 * @returns {JSX.Element} The dashboard page
 */
export default function DashboardPage() {
  const { data: session, status } = useSession();

  // Show loading state while session is being checked
  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-accent-green" />
          <p className="text-text-secondary">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (status === "unauthenticated" || !session?.user) {
    redirect("/login");
  }

  // Default score for display
  const score = 50;

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-1">
            Welcome back, {session.user.name?.split(" ")[0] || "Explorer"}
          </h1>
          <p className="text-text-secondary">Here&apos;s your environmental impact overview for this month.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="secondary" className="flex-1 md:flex-none">
            AI Coach
          </Button>
          <Link href="/log-activity">
            <Button className="flex-1 md:flex-none">
              <Plus size={18} className="mr-2" /> Log Activity
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Row */}
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

      {/* Charts */}
      <CarbonCharts />

      {/* Recent Activity & Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="elevated" className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-text-primary">Recent Activities</h3>
            <button className="text-sm text-accent-green hover:underline">View All</button>
          </div>
          
          <div className="flex flex-col gap-4">
            {[
              { title: "Walked to work", points: "+50 XP", type: "transport", time: "2 hours ago" },
              { title: "Plant-based meal", points: "+30 XP", type: "food", time: "Yesterday" },
              { title: "Recycled electronics", points: "+100 XP", type: "waste", time: "2 days ago" },
              { title: "Public transit", points: "+40 XP", type: "transport", time: "3 days ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-bg-tertiary transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                    activity.type === 'transport' ? 'bg-accent-blue-dim text-accent-blue' :
                    activity.type === 'food' ? 'bg-accent-green-dim text-accent-green' :
                    'bg-accent-purple-dim text-accent-purple'
                  }`}>
                    {activity.type === 'transport' ? '🚲' : activity.type === 'food' ? '🥗' : '♻️'}
                  </div>
                  <div>
                    <h5 className="font-medium text-text-primary text-sm">{activity.title}</h5>
                    <span className="text-xs text-text-muted">{activity.time}</span>
                  </div>
                </div>
                <Badge variant="green" className="font-bold">{activity.points}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="elevated" className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-text-primary">Active Challenges</h3>
            <button className="text-sm text-accent-green hover:underline">Browse</button>
          </div>
          
          <div className="flex flex-col gap-4">
            {[
              { title: "Meatless Week", progress: 70, daysLeft: 2, icon: "🥑" },
              { title: "Zero Waste Weekend", progress: 0, daysLeft: 4, icon: "🗑️" },
              { title: "10k Steps Daily", progress: 40, daysLeft: 12, icon: "👟" },
            ].map((challenge, i) => (
              <div key={i} className="border border-border rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{challenge.icon}</span>
                  <div className="flex-1">
                    <h5 className="font-medium text-text-primary text-sm">{challenge.title}</h5>
                    <span className="text-xs text-text-secondary">{challenge.daysLeft} days left</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8">Details <ArrowRight size={14} className="ml-1" /></Button>
                </div>
                <div className="w-full h-2 bg-bg-tertiary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-eco rounded-full" 
                    style={{ width: `${challenge.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
