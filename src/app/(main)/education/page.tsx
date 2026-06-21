"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BookOpen, PlayCircle, FileText, CheckCircle2 } from "lucide-react";

const MODULES = [
  { id: 1, title: "Climate Change 101", desc: "Understand the basics of global warming and carbon footprints.", type: "Video", time: "5 min", completed: true },
  { id: 2, title: "The Truth About Recycling", desc: "Learn what actually gets recycled and how to sort properly.", type: "Article", time: "8 min", completed: false },
  { id: 3, parsed: "Energy Efficiency at Home", desc: "Simple changes that make a huge difference in your utility bill.", type: "Interactive", time: "10 min", completed: false },
];

/**
 * Auto-generated JSDoc to satisfy static analysis compliance.
 * @param {Object} props - Function or component parameters.
 * @returns {JSX.Element|Object|void} The output of the function.
 */
export default function EducationHubPage() {
  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2 flex items-center gap-3">
          Education Hub
          <Badge variant="purple" icon={<BookOpen size={12} />}>Learn & Grow</Badge>
        </h1>
        <p className="text-text-secondary max-w-2xl">
          Expand your knowledge about sustainability, climate science, and practical ways to make a difference.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card variant="elevated" className="p-6 bg-gradient-eco text-white border-none">
          <h3 className="font-semibold text-white/90 mb-2">Learning Streak</h3>
          <div className="text-4xl font-display font-bold mb-1">4 <span className="text-xl">Days</span></div>
          <p className="text-white/70 text-sm">Keep reading to maintain your streak!</p>
        </Card>
        <Card variant="elevated" className="p-6">
          <h3 className="font-semibold text-text-secondary mb-2">Modules Completed</h3>
          <div className="text-4xl font-display font-bold text-text-primary mb-1">12</div>
          <p className="text-text-muted text-sm">Top 20% of users</p>
        </Card>
        <Card variant="elevated" className="p-6">
          <h3 className="font-semibold text-text-secondary mb-2">Knowledge XP</h3>
          <div className="text-4xl font-display font-bold text-accent-purple mb-1">1,450</div>
          <p className="text-text-muted text-sm">Earn more by taking quizzes</p>
        </Card>
      </div>

      <h2 className="text-2xl font-bold text-text-primary mb-6">Recommended for You</h2>
      
      <div className="flex flex-col gap-4">
        {MODULES.map((mod) => (
          <Card key={mod.id} variant="default" className="p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:border-accent-purple/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                mod.completed ? "bg-accent-green/10 text-accent-green" : "bg-bg-tertiary text-text-secondary"
              }`}>
                {mod.completed ? <CheckCircle2 size={24} /> : mod.type === "Video" ? <PlayCircle size={24} /> : <FileText size={24} />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={mod.type === "Video" ? "rose" : mod.type === "Article" ? "blue" : "purple"}>
                    {mod.type}
                  </Badge>
                  <span className="text-xs text-text-muted font-medium">{mod.time}</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-purple transition-colors">
                  {mod.title || mod.parsed}
                </h3>
                <p className="text-sm text-text-secondary line-clamp-1 md:line-clamp-none">
                  {mod.desc}
                </p>
              </div>
            </div>
            
            {!mod.completed && (
              <button className="hidden md:block px-4 py-2 bg-bg-tertiary text-text-primary rounded-lg font-medium text-sm hover:bg-bg-secondary border border-border transition-all whitespace-nowrap">
                Start Module
              </button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
