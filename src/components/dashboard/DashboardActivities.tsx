import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

type Activity = { title: string; points: string; type: string; time: string };
type Challenge = { title: string; progress: number; daysLeft: number; icon: string };

export function DashboardActivities({ 
  recentActivities, 
  activeChallenges 
}: { 
  recentActivities: Activity[], 
  activeChallenges: Challenge[] 
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card variant="elevated" className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-text-primary">Recent Activities</h3>
          <button className="text-sm text-accent-green hover:underline">View All</button>
        </div>
        
        <div className="flex flex-col gap-4">
          {recentActivities.map((activity, i) => (
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
          {activeChallenges.map((challenge, i) => (
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
  );
}
