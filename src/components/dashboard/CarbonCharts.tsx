"use client";

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Cell
} from "recharts";
import { Card } from "@/components/ui/Card";

// Mock data for initial rendering
const historyData = [
  { month: "Jan", emissions: 1200, target: 1000 },
  { month: "Feb", emissions: 1150, target: 1000 },
  { month: "Mar", emissions: 1100, target: 1000 },
  { month: "Apr", emissions: 1050, target: 1000 },
  { month: "May", emissions: 980, target: 1000 },
  { month: "Jun", emissions: 950, target: 1000 },
];

const categoryData = [
  { name: "Transport", value: 450, color: "#34D399" },
  { name: "Energy", value: 320, color: "#FBBF24" },
  { name: "Food", value: 210, color: "#F87171" },
  { name: "Shopping", value: 120, color: "#A78BFA" },
];

export function CarbonCharts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[300px] w-full animate-pulse bg-bg-tertiary rounded-xl" />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <Card variant="elevated" className="p-6 lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-text-primary">Emissions History</h3>
          <select className="bg-bg-tertiary border border-border text-sm rounded-lg px-3 py-1.5 text-text-secondary focus:outline-none focus:border-accent-green">
            <option>Last 6 Months</option>
            <option>This Year</option>
            <option>All Time</option>
          </select>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-green)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--accent-green)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-muted)" }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-muted)" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--bg-tertiary)", borderColor: "var(--border)", borderRadius: "8px", boxShadow: "var(--shadow-lg)" }}
                itemStyle={{ color: "var(--text-primary)" }}
                labelStyle={{ color: "var(--text-secondary)", marginBottom: "4px" }}
              />
              <Area
                type="monotone"
                dataKey="target"
                stroke="var(--text-muted)"
                strokeDasharray="5 5"
                fill="none"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="emissions"
                stroke="var(--accent-green)"
                fillOpacity={1}
                fill="url(#colorEmissions)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card variant="elevated" className="p-6">
        <h3 className="font-semibold text-text-primary mb-6">Emissions by Category</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border-subtle)" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-secondary)" }} />
              <Tooltip
                cursor={{ fill: "var(--bg-tertiary)" }}
                contentStyle={{ backgroundColor: "var(--bg-tertiary)", borderColor: "var(--border)", borderRadius: "8px" }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
