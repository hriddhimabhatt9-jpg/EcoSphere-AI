// ============================================================
// EcoSphere AI — Carbon Emission Factors Database
// All values in kg CO₂e per unit
// Sources: EPA, DEFRA, IPCC emission factor databases
// ============================================================

export interface EmissionFactor {
  id: string;
  category: string;
  subcategory: string;
  label: string;
  factor: number; // kg CO₂e per unit
  unit: string;
  description?: string;
}

// ---- Transportation Emission Factors (kg CO₂e per km) ----
export const TRANSPORT_FACTORS: EmissionFactor[] = [
  { id: "car_petrol", category: "transportation", subcategory: "car", label: "Petrol Car", factor: 0.192, unit: "km", description: "Average petrol car" },
  { id: "car_diesel", category: "transportation", subcategory: "car", label: "Diesel Car", factor: 0.171, unit: "km", description: "Average diesel car" },
  { id: "car_hybrid", category: "transportation", subcategory: "car", label: "Hybrid Car", factor: 0.118, unit: "km", description: "Average hybrid car" },
  { id: "car_electric", category: "transportation", subcategory: "car", label: "Electric Car", factor: 0.053, unit: "km", description: "Average EV (grid electricity)" },
  { id: "bus", category: "transportation", subcategory: "public", label: "Bus", factor: 0.089, unit: "km", description: "Local bus" },
  { id: "train", category: "transportation", subcategory: "public", label: "Train", factor: 0.041, unit: "km", description: "National rail" },
  { id: "subway", category: "transportation", subcategory: "public", label: "Subway/Metro", factor: 0.033, unit: "km", description: "Urban metro" },
  { id: "tram", category: "transportation", subcategory: "public", label: "Tram", factor: 0.029, unit: "km", description: "Electric tram" },
  { id: "motorcycle", category: "transportation", subcategory: "motorcycle", label: "Motorcycle", factor: 0.113, unit: "km" },
  { id: "bicycle", category: "transportation", subcategory: "active", label: "Bicycle", factor: 0.005, unit: "km", description: "Including manufacturing" },
  { id: "walking", category: "transportation", subcategory: "active", label: "Walking", factor: 0.0, unit: "km" },
  { id: "taxi", category: "transportation", subcategory: "taxi", label: "Taxi/Rideshare", factor: 0.21, unit: "km" },
  { id: "flight_short", category: "transportation", subcategory: "flight", label: "Short Flight (<500km)", factor: 0.255, unit: "km" },
  { id: "flight_medium", category: "transportation", subcategory: "flight", label: "Medium Flight (500-3500km)", factor: 0.156, unit: "km" },
  { id: "flight_long", category: "transportation", subcategory: "flight", label: "Long Flight (>3500km)", factor: 0.150, unit: "km" },
];

// ---- Food Emission Factors (kg CO₂e per kg of food) ----
export const FOOD_FACTORS: EmissionFactor[] = [
  { id: "beef", category: "food", subcategory: "meat", label: "Beef", factor: 27.0, unit: "kg" },
  { id: "lamb", category: "food", subcategory: "meat", label: "Lamb", factor: 24.0, unit: "kg" },
  { id: "pork", category: "food", subcategory: "meat", label: "Pork", factor: 6.1, unit: "kg" },
  { id: "chicken", category: "food", subcategory: "meat", label: "Chicken", factor: 5.7, unit: "kg" },
  { id: "fish", category: "food", subcategory: "seafood", label: "Fish (farmed)", factor: 5.1, unit: "kg" },
  { id: "shrimp", category: "food", subcategory: "seafood", label: "Shrimp", factor: 11.8, unit: "kg" },
  { id: "eggs", category: "food", subcategory: "dairy", label: "Eggs", factor: 4.2, unit: "kg" },
  { id: "cheese", category: "food", subcategory: "dairy", label: "Cheese", factor: 11.0, unit: "kg" },
  { id: "milk", category: "food", subcategory: "dairy", label: "Milk", factor: 1.9, unit: "litre" },
  { id: "tofu", category: "food", subcategory: "plant", label: "Tofu", factor: 2.0, unit: "kg" },
  { id: "rice", category: "food", subcategory: "grain", label: "Rice", factor: 2.7, unit: "kg" },
  { id: "wheat", category: "food", subcategory: "grain", label: "Wheat/Bread", factor: 1.4, unit: "kg" },
  { id: "vegetables", category: "food", subcategory: "produce", label: "Vegetables (average)", factor: 0.5, unit: "kg" },
  { id: "fruits", category: "food", subcategory: "produce", label: "Fruits (average)", factor: 0.7, unit: "kg" },
  { id: "nuts", category: "food", subcategory: "plant", label: "Nuts", factor: 0.3, unit: "kg" },
  { id: "legumes", category: "food", subcategory: "plant", label: "Legumes", factor: 0.9, unit: "kg" },
  { id: "coffee", category: "food", subcategory: "beverage", label: "Coffee", factor: 16.5, unit: "kg" },
  { id: "chocolate", category: "food", subcategory: "processed", label: "Chocolate", factor: 19.0, unit: "kg" },
];

// ---- Daily Meal Emission Estimates (kg CO₂e per day) ----
export const DIET_DAILY_FACTORS: Record<string, number> = {
  "high_meat": 7.2,       // Heavy meat eater
  "medium_meat": 5.6,     // Average meat eater
  "low_meat": 4.7,        // Low meat
  "pescatarian": 3.9,     // Fish, no meat
  "vegetarian": 3.8,      // No meat, no fish
  "vegan": 2.9,           // Plant-based only
};

// ---- Energy Emission Factors ----
export const ENERGY_FACTORS: EmissionFactor[] = [
  { id: "electricity_grid", category: "energy", subcategory: "electricity", label: "Grid Electricity", factor: 0.42, unit: "kWh", description: "Average grid mix" },
  { id: "electricity_renewable", category: "energy", subcategory: "electricity", label: "Renewable Electricity", factor: 0.02, unit: "kWh" },
  { id: "natural_gas", category: "energy", subcategory: "heating", label: "Natural Gas", factor: 2.02, unit: "m³" },
  { id: "heating_oil", category: "energy", subcategory: "heating", label: "Heating Oil", factor: 2.54, unit: "litre" },
  { id: "lpg", category: "energy", subcategory: "heating", label: "LPG", factor: 1.56, unit: "litre" },
  { id: "wood_pellets", category: "energy", subcategory: "heating", label: "Wood Pellets", factor: 0.07, unit: "kg" },
];

// ---- Home Appliance Estimates (kg CO₂e per use or per hour) ----
export const APPLIANCE_FACTORS: EmissionFactor[] = [
  { id: "washer", category: "appliances", subcategory: "laundry", label: "Washing Machine (per load)", factor: 0.6, unit: "load" },
  { id: "dryer", category: "appliances", subcategory: "laundry", label: "Tumble Dryer (per load)", factor: 2.4, unit: "load" },
  { id: "dishwasher", category: "appliances", subcategory: "kitchen", label: "Dishwasher (per load)", factor: 0.77, unit: "load" },
  { id: "oven", category: "appliances", subcategory: "kitchen", label: "Oven (per hour)", factor: 0.84, unit: "hour" },
  { id: "ac", category: "appliances", subcategory: "hvac", label: "Air Conditioner (per hour)", factor: 1.26, unit: "hour" },
  { id: "heater", category: "appliances", subcategory: "hvac", label: "Space Heater (per hour)", factor: 0.63, unit: "hour" },
  { id: "tv", category: "appliances", subcategory: "electronics", label: "TV (per hour)", factor: 0.04, unit: "hour" },
  { id: "computer", category: "appliances", subcategory: "electronics", label: "Computer (per hour)", factor: 0.06, unit: "hour" },
  { id: "shower_hot", category: "appliances", subcategory: "water", label: "Hot Shower (per minute)", factor: 0.11, unit: "minute" },
];

// ---- Shopping Emission Estimates (kg CO₂e per item/purchase) ----
export const SHOPPING_FACTORS: EmissionFactor[] = [
  { id: "clothing_new", category: "shopping", subcategory: "clothing", label: "New Clothing Item", factor: 10.0, unit: "item" },
  { id: "clothing_secondhand", category: "shopping", subcategory: "clothing", label: "Secondhand Clothing", factor: 0.5, unit: "item" },
  { id: "electronics_phone", category: "shopping", subcategory: "electronics", label: "Smartphone", factor: 70.0, unit: "item" },
  { id: "electronics_laptop", category: "shopping", subcategory: "electronics", label: "Laptop", factor: 350.0, unit: "item" },
  { id: "furniture", category: "shopping", subcategory: "home", label: "Furniture (average)", factor: 50.0, unit: "item" },
  { id: "books", category: "shopping", subcategory: "media", label: "Book (print)", factor: 1.1, unit: "item" },
  { id: "online_order", category: "shopping", subcategory: "delivery", label: "Online Order (with delivery)", factor: 0.5, unit: "order", description: "Packaging + last-mile delivery" },
];

// ---- Waste Emission Factors (kg CO₂e per kg) ----
export const WASTE_FACTORS: EmissionFactor[] = [
  { id: "landfill_general", category: "waste", subcategory: "landfill", label: "General Waste (landfill)", factor: 0.58, unit: "kg" },
  { id: "landfill_food", category: "waste", subcategory: "landfill", label: "Food Waste (landfill)", factor: 0.83, unit: "kg" },
  { id: "recycling_paper", category: "waste", subcategory: "recycling", label: "Paper Recycling", factor: 0.02, unit: "kg" },
  { id: "recycling_plastic", category: "waste", subcategory: "recycling", label: "Plastic Recycling", factor: 0.04, unit: "kg" },
  { id: "recycling_glass", category: "waste", subcategory: "recycling", label: "Glass Recycling", factor: 0.03, unit: "kg" },
  { id: "recycling_metal", category: "waste", subcategory: "recycling", label: "Metal Recycling", factor: 0.05, unit: "kg" },
  { id: "composting", category: "waste", subcategory: "organic", label: "Composting", factor: 0.01, unit: "kg" },
];

// ---- All Factors Combined ----
export const ALL_EMISSION_FACTORS: EmissionFactor[] = [
  ...TRANSPORT_FACTORS,
  ...FOOD_FACTORS,
  ...ENERGY_FACTORS,
  ...APPLIANCE_FACTORS,
  ...SHOPPING_FACTORS,
  ...WASTE_FACTORS,
];

/**
 * Get emission factor by ID
 */
export function getEmissionFactor(id: string): EmissionFactor | undefined {
  return ALL_EMISSION_FACTORS.find((f) => f.id === id);
}

/**
 * Get all factors for a category
 */
export function getFactorsByCategory(category: string): EmissionFactor[] {
  return ALL_EMISSION_FACTORS.filter((f) => f.category === category);
}

/**
 * Calculate emissions from a factor ID and value
 */
export function calculateEmission(factorId: string, value: number): number {
  const factor = getEmissionFactor(factorId);
  if (!factor) return 0;
  return +(factor.factor * value).toFixed(3);
}

// ---- Legacy Mapping for Calculator Page & Logic ----
export const EMISSION_FACTORS = {
  transport: {
    car_gas: 0.35, // kg CO2e per mile
    car_ev: 0.1,
    public: 0.15,
    flight_short: 0.25,
  },
  diet: {
    meat_heavy: 2500, // kg CO2e per year
    average: 1500,
    pescatarian: 1200,
    vegetarian: 1000,
    vegan: 700,
  },
  energy: {
    grid_standard: 0.4, // kg CO2e per kWh
    grid_green: 0.05,
    solar: 0.02,
    mixed_renewable: 0.15,
  }
};
