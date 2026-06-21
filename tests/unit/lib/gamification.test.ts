import { describe, it, expect } from 'vitest';
import { calculateXPForAction, determineLevel, XP_REWARDS } from '@/lib/gamification';

describe('gamification.ts', () => {
  describe('calculateXPForAction', () => {
    it('returns base XP for an action', () => {
      expect(calculateXPForAction('transport')).toBe(XP_REWARDS.transport);
      expect(calculateXPForAction('food')).toBe(XP_REWARDS.food);
    });

    it('returns fallback XP for unknown action', () => {
      expect(calculateXPForAction('unknown' as any)).toBe(10);
    });

    it('returns base XP with 50% bonus if isStreak is true', () => {
      expect(calculateXPForAction('transport', true)).toBe(Math.round(XP_REWARDS.transport * 1.5));
      expect(calculateXPForAction('waste', true)).toBe(Math.round(XP_REWARDS.waste * 1.5));
    });
  });

  describe('determineLevel', () => {
    it('calculates level correctly for low XP', () => {
      const result = determineLevel(250);
      expect(result.level).toBe(1);
      expect(result.nextLevelXP).toBe(500);
      expect(result.progress).toBe(50); // 250/500 = 50%
    });

    it('calculates level correctly exactly at boundary', () => {
      const result = determineLevel(500);
      expect(result.level).toBe(2);
      expect(result.nextLevelXP).toBe(2000); // 2^2 * 500
      expect(result.progress).toBe(0); // exactly at level 2
    });

    it('calculates level correctly for high XP', () => {
      // level 3 starts at 2^2 * 500 = 2000
      // level 4 starts at 3^2 * 500 = 4500
      const result = determineLevel(3000);
      expect(result.level).toBe(3);
      expect(result.nextLevelXP).toBe(4500);
      
      const xpInLevel = 3000 - 2000;
      const xpNeeded = 4500 - 2000;
      const expectedProgress = Math.round((xpInLevel / xpNeeded) * 100);
      
      expect(result.progress).toBe(expectedProgress);
    });

    it('handles negative XP gracefully', () => {
      const result = determineLevel(-100);
      expect(result.level).toBe(1);
      expect(result.progress).toBe(0);
    });
  });
});
