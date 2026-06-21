import { describe, it, expect } from 'vitest';
import { 
  calculateTransportEmissions, 
  calculateDietEmissions, 
  calculateEnergyEmissions, 
  calculateCarbonScore 
} from '@/lib/calculator';
import { EMISSION_FACTORS } from '@/constants/emissions';

describe('calculator.ts', () => {
  describe('calculateTransportEmissions', () => {
    it('calculates emissions for gas cars correctly', () => {
      const distance = 100;
      const expected = distance * EMISSION_FACTORS.transport.car_gas;
      expect(calculateTransportEmissions('car_gas', distance)).toBe(expected);
    });

    it('calculates emissions for public transit correctly', () => {
      const distance = 50;
      const expected = distance * EMISSION_FACTORS.transport.public;
      expect(calculateTransportEmissions('public', distance)).toBe(expected);
    });
  });

  describe('calculateDietEmissions', () => {
    it('calculates daily emissions for a vegan diet', () => {
      const expected = (EMISSION_FACTORS.diet.vegan / 365) * 1;
      expect(calculateDietEmissions('vegan', 1)).toBeCloseTo(expected);
    });

    it('calculates multiple days for a meat-heavy diet', () => {
      const expected = (EMISSION_FACTORS.diet.meat_heavy / 365) * 7;
      expect(calculateDietEmissions('meat_heavy', 7)).toBeCloseTo(expected);
    });
  });

  describe('calculateEnergyEmissions', () => {
    it('calculates emissions for standard grid', () => {
      const kWh = 500;
      const expected = kWh * EMISSION_FACTORS.energy.grid_standard;
      expect(calculateEnergyEmissions('grid_standard', kWh)).toBe(expected);
    });

    it('calculates emissions for solar', () => {
      const kWh = 500;
      const expected = kWh * EMISSION_FACTORS.energy.solar;
      expect(calculateEnergyEmissions('solar', kWh)).toBe(expected);
    });
  });

  describe('calculateCarbonScore', () => {
    it('returns a baseline score for an empty profile', () => {
      expect(calculateCarbonScore({})).toBe(50);
    });

    it('increases score for eco-friendly choices', () => {
      const score = calculateCarbonScore({
        transportMode: 'bike', // +15
        dailyCommute: 3,       // +5
        dietType: 'vegan',     // +15
        energySource: 'solar', // +15
        wasteRecycling: true,  // +5
        wasteComposting: true  // +5
      });
      // 50 + 15 + 5 + 15 + 15 + 5 + 5 = 110, capped at 100
      expect(score).toBe(100);
    });

    it('handles middle-ground choices correctly', () => {
      const score = calculateCarbonScore({
        transportMode: 'car_ev', // +5
        dietType: 'vegetarian',  // +10
        dailyCommute: 15,        // no impact (5 <= x <= 30)
      });
      expect(score).toBe(65);

      const score2 = calculateCarbonScore({
        dietType: 'pescatarian', // +5
        energySource: 'nuclear', // no impact (doesn't include renewable, solar, or standard)
      });
      expect(score2).toBe(55);
    });

    it('decreases score for high-carbon choices', () => {
      const score = calculateCarbonScore({
        transportMode: 'car_gas', // -10
        dailyCommute: 50,         // -10
        dietType: 'meat_heavy',   // -15
        energySource: 'grid_standard' // -5
      });
      // 50 - 10 - 10 - 15 - 5 = 10
      expect(score).toBe(10);
    });

    it('bounds score between 0 and 100', () => {
      const superHigh = calculateCarbonScore({
        transportMode: 'car_gas',
        dailyCommute: 500, // custom logic doesn't scale linearly, but let's test extreme
        dietType: 'meat_heavy',
      });
      expect(superHigh).toBeGreaterThanOrEqual(0);
    });
  });
});
