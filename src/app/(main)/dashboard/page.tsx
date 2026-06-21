"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { DashboardActivities } from "@/components/dashboard/DashboardActivities";
import dynamic from "next/dynamic";
import { Plus, Loader2 } from "lucide-react";
import Link from "next/link";

const CarbonCharts = dynamic(() => import("@/components/dashboard/CarbonCharts").then(m => m.CarbonCharts), { 
  ssr: false, 
  loading: () => <div className="h-[400px] flex items-center justify-center rounded-xl border border-border bg-bg-secondary"><Loader2 className="w-8 h-8 animate-spin text-accent-green" /></div> 
});

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

  const recentActivities = React.useMemo(() => [
    { title: "Walked to work", points: "+50 XP", type: "transport", time: "2 hours ago" },
    { title: "Plant-based meal", points: "+30 XP", type: "food", time: "Yesterday" },
    { title: "Recycled electronics", points: "+100 XP", type: "waste", time: "2 days ago" },
    { title: "Public transit", points: "+40 XP", type: "transport", time: "3 days ago" },
  ], []);

  const activeChallenges = React.useMemo(() => [
    { title: "Meatless Week", progress: 70, daysLeft: 2, icon: "🥑" },
    { title: "Zero Waste Weekend", progress: 0, daysLeft: 4, icon: "🗑️" },
    { title: "10k Steps Daily", progress: 40, daysLeft: 12, icon: "👟" },
  ], []);

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

      <StatsGrid score={score} />

      {/* Charts */}
      <CarbonCharts />

      <DashboardActivities 
        recentActivities={recentActivities} 
        activeChallenges={activeChallenges} 
      />
    </div>
  );
}
