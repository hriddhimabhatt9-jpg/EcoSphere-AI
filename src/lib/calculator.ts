import { EMISSION_FACTORS } from "@/constants/emissions";

// All calculations return kg CO2e

export function calculateTransportEmissions(
  mode: keyof typeof EMISSION_FACTORS.transport,
  distanceMiles: number
): number {
  const factor = EMISSION_FACTORS.transport[mode];
  // Convert miles to km for metric calculations if needed, but assuming factor is per mile
  return distanceMiles * factor;
}

export function calculateDietEmissions(
  dietType: keyof typeof EMISSION_FACTORS.diet,
  days: number = 1
): number {
  // factor is annual kg CO2e, so divide by 365
  const annualFactor = EMISSION_FACTORS.diet[dietType];
  return (annualFactor / 365) * days;
}

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
