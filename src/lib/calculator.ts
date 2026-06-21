/**
 * @module calculator
 * @description EcoSphere AI — Carbon Emission Calculation Engine.
 * Implements deterministic mathematical calculations using EPA/IPCC emission factors.
 * All calculations return values in kilograms CO₂ equivalent (kg CO₂e).
 */
import { EMISSION_FACTORS } from "@/constants/emissions";


/**
 * Calculates transport-related carbon emissions based on travel mode and distance.
 * Uses emission factors from the EPA GHG database.
 * @param {string} mode - The transport mode key (e.g., "car_gas", "public", "car_ev")
 * @param {number} distanceMiles - The distance traveled in miles
 * @returns {number} Carbon emissions in kg CO₂e
 */
export function calculateTransportEmissions(
  mode: keyof typeof EMISSION_FACTORS.transport,
  distanceMiles: number
): number {
  const factor = EMISSION_FACTORS.transport[mode];
  // Convert miles to km for metric calculations if needed, but assuming factor is per mile
  return distanceMiles * factor;
}

/**
 * Calculates diet-related carbon emissions based on diet type and duration.
 * Converts annual emission factors to per-day values for precise daily tracking.
 * @param {string} dietType - The diet classification key (e.g., "vegan", "vegetarian", "meat_heavy")
 * @param {number} [days=1] - Number of days to calculate emissions for
 * @returns {number} Carbon emissions in kg CO₂e for the specified period
 */
export function calculateDietEmissions(
  dietType: keyof typeof EMISSION_FACTORS.diet,
  days: number = 1
): number {
  // factor is annual kg CO2e, so divide by 365
  const annualFactor = EMISSION_FACTORS.diet[dietType];
  return (annualFactor / 365) * days;
}

/**
 * Calculates energy consumption carbon emissions based on source type and usage.
 * @param {string} source - The energy source key (e.g., "grid_standard", "solar")
 * @param {number} kWh - Energy consumption in kilowatt-hours
 * @returns {number} Carbon emissions in kg CO₂e
 */
export function calculateEnergyEmissions(
  source: keyof typeof EMISSION_FACTORS.energy,
  kWh: number
): number {
  const factor = EMISSION_FACTORS.energy[source];
  return kWh * factor;
}

/**
 * Calculates a generalized user carbon score from 0 to 100
 * where 100 is excellent (very low carbon footprint)
 * and 0 is poor (very high carbon footprint)
 */
export function calculateCarbonScore(
  profileData: {
    transportMode?: string;
    dailyCommute?: number;
    dietType?: string;
    energySource?: string;
    wasteRecycling?: boolean;
    wasteComposting?: boolean;
  },
  recentActivitiesData?: any[]
): number {
  let score = 50; // Starting baseline

  // Transport Impact
  if (profileData.transportMode) {
    if (["bike", "walk", "public"].includes(profileData.transportMode)) {
      score += 15;
    } else if (profileData.transportMode === "car_ev") {
      score += 5;
    } else {
      score -= 10;
    }
  }

  // Commute Distance Impact
  if (profileData.dailyCommute) {
    if (profileData.dailyCommute < 5) score += 5;
    else if (profileData.dailyCommute > 30) score -= 10;
  }

  // Diet Impact
  if (profileData.dietType) {
    switch (profileData.dietType) {
      case "vegan": score += 15; break;
      case "vegetarian": score += 10; break;
      case "pescatarian": score += 5; break;
      case "meat_heavy": score -= 15; break;
    }
  }

  // Energy Impact
  if (profileData.energySource) {
    if (profileData.energySource.includes("renewable") || profileData.energySource === "solar") {
      score += 15;
    } else if (profileData.energySource.includes("standard")) {
      score -= 5;
    }
  }

  // Waste Impact
  if (profileData.wasteRecycling) score += 5;
  if (profileData.wasteComposting) score += 5;

  // Bound the score between 0 and 100
  return Math.min(Math.max(Math.round(score), 0), 100);
}
