"use strict";
/**
 * @module badges
 * @description EcoSphere AI — Gamification Constants.
 * Defines the 20-level progression system, 25+ achievement badges across 4 tiers,
 * XP reward values, Green Coin economy, and tier color mappings.
 */

import type { LevelInfo, Achievement } from "@/types";

// ---- Level Thresholds ----
export const LEVELS: LevelInfo[] = [
  { level: 1, title: "Seedling", minXP: 0, maxXP: 100 },
  { level: 2, title: "Sprout", minXP: 100, maxXP: 250 },
  { level: 3, title: "Sapling", minXP: 250, maxXP: 500 },
  { level: 4, title: "Green Thumb", minXP: 500, maxXP: 800 },
  { level: 5, title: "Nature Friend", minXP: 800, maxXP: 1200 },
  { level: 6, title: "Eco Warrior", minXP: 1200, maxXP: 1800 },
  { level: 7, title: "Earth Guardian", minXP: 1800, maxXP: 2500 },
  { level: 8, title: "Climate Champion", minXP: 2500, maxXP: 3500 },
  { level: 9, title: "Sustainability Hero", minXP: 3500, maxXP: 5000 },
  { level: 10, title: "Planet Protector", minXP: 5000, maxXP: 7000 },
  { level: 11, title: "Biosphere Defender", minXP: 7000, maxXP: 9500 },
  { level: 12, title: "Carbon Neutral", minXP: 9500, maxXP: 12500 },
  { level: 13, title: "Green Legend", minXP: 12500, maxXP: 16000 },
  { level: 14, title: "Eco Master", minXP: 16000, maxXP: 20000 },
  { level: 15, title: "Earth Sage", minXP: 20000, maxXP: 25000 },
  { level: 16, title: "Sustainability Oracle", minXP: 25000, maxXP: 31000 },
  { level: 17, title: "Nature Whisperer", minXP: 31000, maxXP: 38000 },
  { level: 18, title: "Global Guardian", minXP: 38000, maxXP: 46000 },
  { level: 19, title: "Climate Titan", minXP: 46000, maxXP: 55000 },
  { level: 20, title: "EcoSphere Legend", minXP: 55000, maxXP: Infinity },
];

/**
 * Determines the current level information based on accumulated XP.
 * Traverses the level table from highest to lowest to find the matching tier.
 * @param {number} xp - The user's current total experience points
 * @returns {LevelInfo} The level information object containing level number, title, and XP thresholds
 */
export function getLevelFromXP(xp: number): LevelInfo {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) return LEVELS[i];
  }
  return LEVELS[0];
}

/**
 * Calculates the percentage progress toward the next level.
 * Returns 100 for users at the maximum level (EcoSphere Legend).
 * @param {number} xp - The user's current total experience points
 * @returns {number} Progress percentage from 0 to 100
 */
export function getXPProgress(xp: number): number {
  const level = getLevelFromXP(xp);
  if (level.maxXP === Infinity) return 100;
  const progress = ((xp - level.minXP) / (level.maxXP - level.minXP)) * 100;
  return Math.min(progress, 100);
}

/**
 * Calculates the remaining XP needed to reach the next level.
 * Returns 0 for users at the maximum level.
 * @param {number} xp - The user's current total experience points
 * @returns {number} The number of XP points needed for the next level
 */
export function getXPToNextLevel(xp: number): number {
  const level = getLevelFromXP(xp);
  if (level.maxXP === Infinity) return 0;
  return level.maxXP - xp;
}

// ---- Badge Definitions ----
export const BADGES: Achievement[] = [
  // Getting started
  { id: "first_calc", name: "First Steps", description: "Complete your first carbon calculation", icon: "🌱", tier: "bronze", criteria: "complete_first_calculation" },
  { id: "profile_complete", name: "Identity Forged", description: "Complete your profile setup", icon: "🎭", tier: "bronze", criteria: "complete_onboarding" },
  { id: "first_challenge", name: "Challenge Accepted", description: "Join your first challenge", icon: "⚔️", tier: "bronze", criteria: "join_first_challenge" },
  
  // Streaks
  { id: "streak_3", name: "Consistent", description: "Maintain a 3-day streak", icon: "🔥", tier: "bronze", criteria: "streak_3" },
  { id: "streak_7", name: "Week Warrior", description: "Maintain a 7-day streak", icon: "🔥", tier: "silver", criteria: "streak_7" },
  { id: "streak_30", name: "Monthly Master", description: "Maintain a 30-day streak", icon: "🔥", tier: "gold", criteria: "streak_30" },
  { id: "streak_100", name: "Century Streak", description: "Maintain a 100-day streak", icon: "💎", tier: "platinum", criteria: "streak_100" },

  // Carbon reduction
  { id: "reduce_10", name: "Carbon Cutter", description: "Reduce emissions by 10% in a week", icon: "✂️", tier: "bronze", criteria: "reduce_weekly_10" },
  { id: "reduce_25", name: "Emission Slayer", description: "Reduce emissions by 25% in a month", icon: "⚡", tier: "silver", criteria: "reduce_monthly_25" },
  { id: "reduce_50", name: "Half the Impact", description: "Reduce emissions by 50% from baseline", icon: "🌟", tier: "gold", criteria: "reduce_baseline_50" },

  // Education
  { id: "first_lesson", name: "Curious Mind", description: "Complete your first lesson", icon: "📚", tier: "bronze", criteria: "complete_first_lesson" },
  { id: "lessons_10", name: "Knowledge Seeker", description: "Complete 10 lessons", icon: "🎓", tier: "silver", criteria: "complete_10_lessons" },
  { id: "lessons_all", name: "Scholar", description: "Complete all lessons in a category", icon: "🏛️", tier: "gold", criteria: "complete_category_lessons" },

  // Community
  { id: "join_community", name: "Team Player", description: "Join a community group", icon: "🤝", tier: "bronze", criteria: "join_community" },
  { id: "top_10", name: "Rising Star", description: "Reach top 10 on leaderboard", icon: "⭐", tier: "silver", criteria: "leaderboard_top_10" },
  { id: "top_1", name: "Champion", description: "Reach #1 on leaderboard", icon: "👑", tier: "platinum", criteria: "leaderboard_top_1" },

  // Challenges
  { id: "challenges_5", name: "Challenger", description: "Complete 5 challenges", icon: "🏆", tier: "bronze", criteria: "complete_5_challenges" },
  { id: "challenges_25", name: "Challenge Master", description: "Complete 25 challenges", icon: "🏅", tier: "silver", criteria: "complete_25_challenges" },
  { id: "challenges_100", name: "Legendary Challenger", description: "Complete 100 challenges", icon: "💫", tier: "gold", criteria: "complete_100_challenges" },

  // AI features
  { id: "ai_chat", name: "AI Companion", description: "Have your first conversation with the AI Coach", icon: "🤖", tier: "bronze", criteria: "first_ai_chat" },
  { id: "carbon_twin", name: "Twin Explorer", description: "View your AI Carbon Twin simulation", icon: "👥", tier: "bronze", criteria: "view_carbon_twin" },
  { id: "scanner", name: "Eco Detective", description: "Scan 10 products with AI Scanner", icon: "🔍", tier: "silver", criteria: "scan_10_products" },

  // Special
  { id: "earth_day", name: "Earth Day Hero", description: "Log activity on Earth Day", icon: "🌍", tier: "gold", criteria: "activity_earth_day" },
  { id: "zero_day", name: "Zero Carbon Day", description: "Achieve a near-zero emission day", icon: "🌿", tier: "platinum", criteria: "zero_carbon_day" },
];

/**
 * Retrieves a specific achievement/badge definition by its unique identifier.
 * @param {string} id - The badge identifier (e.g., "first_calc", "streak_30")
 * @returns {Achievement | undefined} The matching achievement, or undefined if not found
 */
export function getBadge(id: string): Achievement | undefined {
  return BADGES.find((b) => b.id === id);
}

/**
 * Retrieves all achievements/badges belonging to a specific tier.
 * @param {string} tier - The tier to filter by ("bronze", "silver", "gold", or "platinum")
 * @returns {Achievement[]} Array of achievements in the specified tier
 */
export function getBadgesByTier(tier: string): Achievement[] {
  return BADGES.filter((b) => b.tier === tier);
}

// ---- XP Reward Values ----
export const XP_REWARDS = {
  DAILY_LOGIN: 10,
  CARBON_ENTRY: 15,
  CHALLENGE_EASY: 25,
  CHALLENGE_MEDIUM: 50,
  CHALLENGE_HARD: 100,
  CHALLENGE_EXPERT: 200,
  LESSON_COMPLETE: 30,
  WEEKLY_GOAL: 75,
  MONTHLY_GOAL: 200,
  STREAK_BONUS_PER_DAY: 5,
  COMMUNITY_JOIN: 20,
  REPORT_VIEW: 10,
  AI_SCANNER: 15,
  REFERRAL: 100,
};

// ---- Green Coin Values ----
export const COIN_REWARDS = {
  CHALLENGE_EASY: 5,
  CHALLENGE_MEDIUM: 15,
  CHALLENGE_HARD: 30,
  CHALLENGE_EXPERT: 50,
  WEEKLY_GOAL: 25,
  MONTHLY_GOAL: 100,
  BADGE_BRONZE: 10,
  BADGE_SILVER: 25,
  BADGE_GOLD: 50,
  BADGE_PLATINUM: 100,
  LEVEL_UP: 20,
};

// ---- Tier Colors ----
export const TIER_COLORS = {
  bronze: "hsl(30, 50%, 55%)",
  silver: "hsl(220, 10%, 70%)",
  gold: "hsl(45, 90%, 55%)",
  platinum: "hsl(200, 80%, 70%)",
};
