export type ActionType = 'transport' | 'food' | 'energy' | 'shopping' | 'waste';

export const XP_REWARDS: Record<ActionType, number> = {
  transport: 50, // e.g., using public transit, walking
  food: 30, // e.g., plant-based meal
  energy: 20, // e.g., turning off lights, eco-wash
  shopping: 40, // e.g., buying eco-friendly products
  waste: 100, // e.g., recycling electronics
};

export function calculateXPForAction(actionType: ActionType, isStreak: boolean = false): number {
  let base = XP_REWARDS[actionType] || 10;
  if (isStreak) {
    base = Math.round(base * 1.5); // 50% bonus for streak
  }
  return base;
}

export function determineLevel(totalXP: number): { level: number; nextLevelXP: number; progress: number } {
  const baseXPRequired = 500;
  // level = floor(sqrt(totalXP / baseXPRequired)) + 1
  // This means: Level 1: 0-499, Level 2: 500-1999, Level 3: 2000-4499, etc.
  if (totalXP < 0) return { level: 1, nextLevelXP: baseXPRequired, progress: 0 };
  
  const level = Math.floor(Math.sqrt(totalXP / baseXPRequired)) + 1;
  const currentLevelBaseXP = Math.pow(level - 1, 2) * baseXPRequired;
  const nextLevelXP = Math.pow(level, 2) * baseXPRequired;
  
  const progressToNext = totalXP - currentLevelBaseXP;
  const xpNeeded = nextLevelXP - currentLevelBaseXP;
  const progress = Math.min(100, Math.max(0, Math.round((progressToNext / xpNeeded) * 100)));
  
  return { level, nextLevelXP, progress };
}
