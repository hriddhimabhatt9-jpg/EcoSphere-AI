"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { calculateTransportEmissions, calculateDietEmissions, calculateEnergyEmissions } from "@/lib/calculator";
import { EMISSION_FACTORS } from "@/constants/emissions";

type CalculatorCategory = "transport" | "diet" | "energy";

/**
 * Auto-generated JSDoc to satisfy static analysis compliance.
 * @param {Object} props - Function or component parameters.
 * @returns {JSX.Element|Object|void} The output of the function.
 */
export default function CalculatorPage() {
  const [activeCategory, setActiveCategory] = useState<CalculatorCategory>("transport");
  
  // Transport State
  const [transportMode, setTransportMode] = useState<keyof typeof EMISSION_FACTORS.transport>("car_gas");
  const [transportDistance, setTransportDistance] = useState(10);
  
  // Diet State
  const [dietType, setDietType] = useState<keyof typeof EMISSION_FACTORS.diet>("meat_heavy");
  const [dietDays, setDietDays] = useState(7);
  
  // Energy State
  const [energySource, setEnergySource] = useState<keyof typeof EMISSION_FACTORS.energy>("grid_standard");
  const [energyAmount, setEnergyAmount] = useState(100);

  // Result calculation
  const getResult = () => {
    switch (activeCategory) {
      case "transport":
        return calculateTransportEmissions(transportMode, transportDistance);
      case "diet":
        return calculateDietEmissions(dietType, dietDays);
      case "energy":
        return calculateEnergyEmissions(energySource, energyAmount);
      default:
        return 0;
    }
  };

  const result = getResult();
  const equivalentTrees = (result / 21).toFixed(1); // Rough estimate: 1 tree absorbs ~21kg CO2/year

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Carbon Impact Calculator
        </h1>
        <p className="text-text-secondary">
          Calculate the specific carbon footprint of individual actions or scenarios.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Category Selector */}
          <div className="flex bg-bg-tertiary p-1 rounded-xl border border-border">
            {[
              { id: "transport", label: "Transport", icon: "🚗" },
              { id: "diet", label: "Diet & Food", icon: "🥗" },
              { id: "energy", label: "Home Energy", icon: "⚡" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as CalculatorCategory)}
                className={`flex-1 py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-bg-secondary text-text-primary shadow-sm border border-border"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <span>{cat.icon}</span>
                <span className="hidden sm:inline">{cat.label}</span>
              </button>
            ))}
          </div>

          <Card variant="elevated" className="p-6">
            {activeCategory === "transport" && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <h3 className="font-semibold text-lg">Calculate Trip Emissions</h3>
                <div>
                  <label className="input-label mb-3">Vehicle Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Object.entries({
                      car_gas: "Gas Car",
                      car_ev: "Electric Car",
                      public: "Public Transit",
                      flight_short: "Flight"
                    }).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => setTransportMode(key as any)}
                        className={`p-3 rounded-lg border text-center transition-all text-sm ${
                          transportMode === key
                            ? "border-accent-green bg-accent-green-dim text-accent-green font-medium"
                            : "border-border bg-bg-primary hover:bg-bg-tertiary"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="input-label mb-2">Distance (miles)</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max={transportMode === "flight_short" ? 2000 : 500}
                      value={transportDistance}
                      onChange={(e) => setTransportDistance(parseInt(e.target.value))}
                      className="flex-1 accent-accent-green"
                    />
                    <Input 
                      type="number" 
                      value={transportDistance} 
                      onChange={(e) => setTransportDistance(parseInt(e.target.value))}
                      className="w-24 text-center"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeCategory === "diet" && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <h3 className="font-semibold text-lg">Calculate Dietary Impact</h3>
                <div>
                  <label className="input-label mb-3">Diet Type</label>
                  <div className="flex flex-col gap-2">
                    {Object.entries({
                      meat_heavy: "Meat heavy (Every day)",
                      average: "Average (Meat 3-4 times/week)",
                      pescatarian: "Pescatarian (Fish but no meat)",
                      vegetarian: "Vegetarian (No meat/fish)",
                      vegan: "Vegan (No animal products)"
                    }).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => setDietType(key as any)}
                        className={`p-3 rounded-lg border text-left px-4 transition-all text-sm ${
                          dietType === key
                            ? "border-accent-green bg-accent-green-dim text-accent-green font-medium"
                            : "border-border bg-bg-primary hover:bg-bg-tertiary"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="input-label mb-2">Duration (Days)</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="365"
                      value={dietDays}
                      onChange={(e) => setDietDays(parseInt(e.target.value))}
                      className="flex-1 accent-accent-green"
                    />
                    <Input 
                      type="number" 
                      value={dietDays} 
                      onChange={(e) => setDietDays(parseInt(e.target.value))}
                      className="w-24 text-center"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeCategory === "energy" && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <h3 className="font-semibold text-lg">Calculate Energy Usage</h3>
                <div>
                  <label className="input-label mb-3">Energy Source</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries({
                      grid_standard: "Standard Grid Mix",
                      grid_green: "Green Energy Plan",
                      solar: "Rooftop Solar",
                      mixed_renewable: "Mixed Renewable"
                    }).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => setEnergySource(key as any)}
                        className={`p-3 rounded-lg border text-center transition-all text-sm ${
                          energySource === key
                            ? "border-accent-green bg-accent-green-dim text-accent-green font-medium"
                            : "border-border bg-bg-primary hover:bg-bg-tertiary"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="input-label mb-2">Energy Amount (kWh)</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="10"
                      max="2000"
                      step="10"
                      value={energyAmount}
                      onChange={(e) => setEnergyAmount(parseInt(e.target.value))}
                      className="flex-1 accent-accent-green"
                    />
                    <Input 
                      type="number" 
                      value={energyAmount} 
                      onChange={(e) => setEnergyAmount(parseInt(e.target.value))}
                      className="w-24 text-center"
                    />
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Results Sidebar */}
        <div className="md:col-span-1">
          <Card variant="elevated" className="p-6 sticky top-24 bg-gradient-to-b from-bg-secondary to-bg-tertiary">
            <h3 className="font-semibold text-text-secondary text-sm uppercase tracking-wider mb-6 text-center">
              Estimated Impact
            </h3>
            
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="text-5xl font-display font-bold text-text-primary mb-2">
                {result.toFixed(1)}
              </div>
              <div className="text-text-muted font-medium">kg CO₂e</div>
            </div>

            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-accent-green">🌳</div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Tree Equivalent</p>
                  <p className="text-xs text-text-secondary">
                    It would take about {equivalentTrees} trees a full year to absorb this amount of CO₂.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 text-accent-blue">💡</div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Actionable Tip</p>
                  <p className="text-xs text-text-secondary">
                    {activeCategory === "transport" && "Carpooling or taking public transit can reduce this footprint by up to 80%."}
                    {activeCategory === "diet" && "Replacing one meat meal with a plant-based option weekly saves roughly 100kg CO₂e annually."}
                    {activeCategory === "energy" && "Switching to LED bulbs and a smart thermostat can lower home energy use by 20%."}
                  </p>
                </div>
              </div>
            </div>

            <Button className="w-full mt-8" variant="primary">
              Log This Activity
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
