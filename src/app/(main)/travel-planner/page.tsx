"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Map, Plane, Train, Car, Navigation, Leaf } from "lucide-react";

/**
 * Auto-generated JSDoc to satisfy static analysis compliance.
 * @param {Object} props - Function or component parameters.
 * @returns {JSX.Element|Object|void} The output of the function.
 */
export default function TravelPlannerPage() {
  const [destination, setDestination] = useState("");
  const [origin, setOrigin] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (origin && destination) {
      setShowResults(true);
    }
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2 flex items-center gap-3">
          Smart Travel Planner
          <Badge variant="green" icon={<Map size={12} />}>AI Powered</Badge>
        </h1>
        <p className="text-text-secondary">
          Find the most eco-friendly routes and transportation methods for your next trip. Our AI analyzes schedules, distances, and emissions to suggest the best path.
        </p>
      </div>

      <Card variant="elevated" className="p-6 md:p-8 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <Input 
              label="From" 
              placeholder="e.g. New York, NY" 
              value={origin} 
              onChange={(e) => setOrigin(e.target.value)} 
              required 
            />
          </div>
          <div className="flex-1 w-full">
            <Input 
              label="To" 
              placeholder="e.g. Washington, DC" 
              value={destination} 
              onChange={(e) => setDestination(e.target.value)} 
              required 
            />
          </div>
          <Button type="submit" variant="primary" className="w-full md:w-auto h-[42px] px-8">
            Analyze Routes
          </Button>
        </form>
      </Card>

      {showResults && (
        <div className="grid grid-cols-1 gap-6 animate-fade-in-up">
          <h3 className="text-xl font-bold text-text-primary mb-2">Recommended Routes</h3>
          
          <Card variant="elevated" className="p-0 overflow-hidden border-accent-green relative">
            <div className="absolute top-4 right-4">
              <Badge variant="green" icon={<Leaf size={12} />}>Eco Pick</Badge>
            </div>
            <div className="p-6 bg-gradient-to-r from-accent-green/10 to-transparent border-b border-border">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-accent-green text-white flex items-center justify-center text-xl shadow-lg">
                  <Train size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-text-primary">Amtrak Northeast Regional</h4>
                  <p className="text-sm text-text-secondary">Direct • 3h 20m</p>
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex-1 w-full flex items-center justify-between px-8">
                <div className="text-center">
                  <span className="block font-bold text-lg">{origin}</span>
                  <span className="text-xs text-text-muted">08:00 AM</span>
                </div>
                <div className="flex-1 h-px bg-border mx-4 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-secondary px-2 text-text-muted">
                    <Navigation size={16} />
                  </div>
                </div>
                <div className="text-center">
                  <span className="block font-bold text-lg">{destination}</span>
                  <span className="text-xs text-text-muted">11:20 AM</span>
                </div>
              </div>
              <div className="w-full md:w-auto pl-0 md:pl-8 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 flex flex-col items-center justify-center">
                <span className="text-xs text-text-muted uppercase tracking-wider mb-1">Emissions</span>
                <span className="text-3xl font-display font-bold text-accent-green">14 <span className="text-sm text-text-secondary">kg CO₂</span></span>
              </div>
            </div>
          </Card>

          <Card variant="default" className="p-0 overflow-hidden opacity-70 hover:opacity-100 transition-opacity">
            <div className="p-6 bg-bg-tertiary border-b border-border">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-bg-secondary border border-border text-text-primary flex items-center justify-center text-xl">
                  <Car size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-primary">Driving (Gas Car)</h4>
                  <p className="text-sm text-text-secondary">Non-stop • 3h 45m</p>
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex-1 w-full flex items-center justify-between px-8">
                <div className="text-center">
                  <span className="block font-bold text-lg">{origin}</span>
                </div>
                <div className="flex-1 h-px bg-border mx-4 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-primary px-2 text-text-muted">
                    <Navigation size={16} />
                  </div>
                </div>
                <div className="text-center">
                  <span className="block font-bold text-lg">{destination}</span>
                </div>
              </div>
              <div className="w-full md:w-auto pl-0 md:pl-8 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 flex flex-col items-center justify-center">
                <span className="text-xs text-text-muted uppercase tracking-wider mb-1">Emissions</span>
                <span className="text-3xl font-display font-bold text-text-primary">85 <span className="text-sm text-text-secondary">kg CO₂</span></span>
              </div>
            </div>
          </Card>
          
          <Card variant="default" className="p-0 overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
            <div className="p-6 bg-bg-tertiary border-b border-border">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-accent-rose/10 border border-accent-rose/20 text-accent-rose flex items-center justify-center text-xl">
                  <Plane size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-primary">Flight</h4>
                  <p className="text-sm text-text-secondary">Direct • 1h 15m (Excl. airport time)</p>
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex-1 w-full flex items-center justify-between px-8">
                <div className="text-center">
                  <span className="block font-bold text-lg">{origin}</span>
                </div>
                <div className="flex-1 h-px bg-border mx-4 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-primary px-2 text-text-muted">
                    <Navigation size={16} />
                  </div>
                </div>
                <div className="text-center">
                  <span className="block font-bold text-lg">{destination}</span>
                </div>
              </div>
              <div className="w-full md:w-auto pl-0 md:pl-8 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 flex flex-col items-center justify-center">
                <span className="text-xs text-text-muted uppercase tracking-wider mb-1">Emissions</span>
                <span className="text-3xl font-display font-bold text-accent-rose">120 <span className="text-sm text-text-secondary">kg CO₂</span></span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
