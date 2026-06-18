"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ShoppingBag, Leaf, ExternalLink, Search } from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "Eco-Friendly Laundry Detergent", brand: "EarthWash", price: "$14.99", rating: "A+", co2: "0.5 kg", image: "🧼", tags: ["Plastic-Free", "Biodegradable"] },
  { id: 2, name: "Reusable Silicone Storage Bags", brand: "Stasher", price: "$45.00", rating: "A", co2: "1.2 kg", image: "🛍️", tags: ["Zero Waste", "Durable"] },
  { id: 3, name: "Bamboo Toothbrush (4-Pack)", brand: "Brush with Bamboo", price: "$12.00", rating: "A+", co2: "0.1 kg", image: "🪥", tags: ["Compostable", "Vegan"] },
  { id: 4, name: "Solar Power Bank 10000mAh", brand: "SunCharge", price: "$29.99", rating: "B+", co2: "4.5 kg", image: "🔋", tags: ["Renewable", "Recycled Materials"] },
];

export default function ShoppingPage() {
  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2 flex items-center gap-3">
            Green Shopping
            <Badge variant="green" icon={<ShoppingBag size={12} />}>Curated</Badge>
          </h1>
          <p className="text-text-secondary max-w-2xl">
            Discover sustainable alternatives to everyday products. Every item here is vetted for its environmental impact.
          </p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-bg-secondary border border-border rounded-full h-10 pl-9 pr-4 text-sm focus:border-accent-green focus:ring-1 focus:ring-accent-green transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {PRODUCTS.map((product) => (
          <Card key={product.id} variant="elevated" className="flex flex-col overflow-hidden group">
            <div className="h-48 bg-bg-tertiary flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500">
              {product.image}
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">{product.brand}</span>
                <Badge variant={product.rating === "A+" ? "green" : "amber"} className="font-bold">
                  Grade {product.rating}
                </Badge>
              </div>
              
              <h3 className="font-bold text-text-primary text-lg mb-2 leading-tight">
                {product.name}
              </h3>
              
              <div className="flex flex-wrap gap-1.5 mb-4">
                {product.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 bg-bg-tertiary border border-border rounded text-text-secondary">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <div className="font-bold text-lg text-text-primary">{product.price}</div>
                  <div className="text-xs text-text-muted flex items-center gap-1">
                    <Leaf size={10} className="text-accent-green" />
                    {product.co2} CO₂e to make
                  </div>
                </div>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <ExternalLink size={16} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
