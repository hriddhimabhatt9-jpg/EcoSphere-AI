"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { logActivity } from "@/actions/activity";

const CATEGORIES = [
  { id: "TRANSPORT", label: "Transport", icon: "🚲", color: "text-accent-blue", bg: "bg-accent-blue-dim", border: "border-accent-blue" },
  { id: "FOOD", label: "Food & Diet", icon: "🥗", color: "text-accent-green", bg: "bg-accent-green-dim", border: "border-accent-green" },
  { id: "ENERGY", label: "Energy", icon: "⚡", color: "text-accent-amber", bg: "bg-accent-amber-dim", border: "border-accent-amber" },
  { id: "WASTE", label: "Waste", icon: "♻️", color: "text-accent-rose", bg: "bg-accent-rose-dim", border: "border-accent-rose" },
  { id: "SHOPPING", label: "Shopping", icon: "🛍️", color: "text-accent-purple", bg: "bg-accent-purple-dim", border: "border-accent-purple" },
];

export default function LogActivityPage() {
  const router = useRouter();
  const { success: showSuccess, error: showError } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("TRANSPORT");
  const [impactAmount, setImpactAmount] = useState<number>(5.5);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append("category", selectedCategory);
      formData.append("impactAmount", impactAmount.toString());

      const result = await logActivity(formData);

      if (result?.error) {
        showError(result.error);
      } else {
        showSuccess(`Activity logged! You earned ${result.xpEarned} XP`, "Success");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      showError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Log an Activity
        </h1>
        <p className="text-text-secondary">
          Record your sustainable choices to earn XP and track your progress.
        </p>
      </div>

      <Card variant="elevated" className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          {/* Category Selection */}
          <div>
            <label className="input-label mb-3 text-lg">What kind of activity?</label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    selectedCategory === cat.id
                      ? `${cat.border} ${cat.bg} ${cat.color} font-medium`
                      : "border-border bg-bg-secondary hover:bg-bg-tertiary text-text-secondary"
                  }`}
                >
                  <span className="text-2xl mb-1">{cat.icon}</span>
                  <span className="text-xs">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Activity Details */}
          <div className="flex flex-col gap-4">
            <label className="input-label text-lg">Activity Details</label>
            
            <Input
              label="Activity Title"
              name="title"
              placeholder="e.g. Biked to work, Plant-based lunch"
              required
            />

            <div className="flex flex-col gap-1">
              <label className="input-label">Description (Optional)</label>
              <textarea
                name="description"
                rows={3}
                className="input custom-scrollbar resize-none"
                placeholder="Add any extra details..."
              />
            </div>
          </div>

          {/* Estimated Impact */}
          <div className="bg-bg-tertiary p-5 rounded-xl border border-border">
            <div className="flex items-center justify-between mb-4">
              <label className="input-label text-lg mb-0">Estimated CO₂e Saved</label>
              <div className="bg-bg-secondary px-3 py-1 rounded-lg border border-border font-medium text-accent-green">
                {impactAmount} kg
              </div>
            </div>
            
            <input
              type="range"
              min="0.1"
              max="50"
              step="0.1"
              value={impactAmount}
              onChange={(e) => setImpactAmount(parseFloat(e.target.value))}
              className="w-full accent-accent-green"
            />
            <div className="flex justify-between text-xs text-text-muted mt-2">
              <span>Small impact</span>
              <span>Massive impact</span>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-4 border-t border-border mt-2">
            <Button 
              type="button" 
              variant="ghost" 
              className="flex-1"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary" 
              className="flex-1"
              isLoading={isLoading}
            >
              Log Activity & Earn XP
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
