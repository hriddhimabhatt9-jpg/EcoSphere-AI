// ============================================================
// EcoSphere AI — TypeScript Type Definitions
// ============================================================

// ---- User & Auth ----
export interface User {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  provider: "email" | "google" | "github";
  onboardingComplete: boolean;
  createdAt: Date;
}

export interface UserProfile {
  id: string;
  userId: string;
  transportMode: TransportMode;
  dietType: DietType;
  energySource: EnergySource;
  housingType: HousingType;
  shoppingHabits: ShoppingHabits;
  xp: number;
  level: number;
  greenCoins: number;
  streak: number;
  weeklyGoal: number;
  monthlyGoal: number;
  carbonScore: number;
}

// ---- Carbon ----
export type CarbonCategory =
  | "transportation"
  | "food"
  | "energy"
  | "shopping"
  | "waste"
  | "travel"
  | "appliances"
  | "lifestyle";

export interface CarbonEntry {
  id: string;
  userId: string;
  date: Date;
  category: CarbonCategory;
  subcategory: string;
  value: number;
  unit: string;
  emissionKg: number;
  notes?: string;
  createdAt: Date;
}

export interface CarbonBreakdown {
  category: CarbonCategory;
  totalKg: number;
  percentage: number;
  trend: "up" | "down" | "stable";
  trendPercentage: number;
}

export interface CarbonSummary {
  totalKg: number;
  dailyAvg: number;
  weeklyTotal: number;
  monthlyTotal: number;
  yearlyEstimate: number;
  breakdown: CarbonBreakdown[];
  score: number; // 0-100 eco score
}

// ---- Carbon Twin ----
export interface CarbonTwinSimulation {
  currentLifestyle: YearlyProjection;
  greenLifestyle: YearlyProjection;
  recommendations: TwinRecommendation[];
}

export interface YearlyProjection {
  annualEmissions: number;
  monthlyBreakdown: { month: string; emissions: number }[];
  categoryBreakdown: CarbonBreakdown[];
}

export interface TwinRecommendation {
  id: string;
  title: string;
  description: string;
  category: CarbonCategory;
  savingsKg: number;
  difficulty: "easy" | "moderate" | "hard";
  impact: "low" | "medium" | "high";
}

// ---- Challenges ----
export type ChallengeType = "daily" | "weekly" | "seasonal";
export type ChallengeDifficulty = "easy" | "medium" | "hard" | "expert";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: CarbonCategory;
  type: ChallengeType;
  difficulty: ChallengeDifficulty;
  xpReward: number;
  coinReward: number;
  targetValue: number;
  unit: string;
  startDate?: Date;
  endDate?: Date;
  icon: string;
}

export interface ChallengeParticipation {
  id: string;
  userId: string;
  challengeId: string;
  challenge: Challenge;
  progress: number;
  completed: boolean;
  completedAt?: Date;
  joinedAt: Date;
}

// ---- Achievements ----
export type BadgeTier = "bronze" | "silver" | "gold" | "platinum";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: BadgeTier;
  criteria: string;
  unlockedAt?: Date;
}

// ---- Gamification ----
export interface GamificationState {
  xp: number;
  level: number;
  xpToNextLevel: number;
  greenCoins: number;
  streak: number;
  achievements: Achievement[];
  activeChallenges: ChallengeParticipation[];
}

export interface LevelInfo {
  level: number;
  title: string;
  minXP: number;
  maxXP: number;
}

// ---- Community ----
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  image?: string;
  score: number;
  level: number;
  trend: "up" | "down" | "stable";
}

export interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  type: "campus" | "city" | "custom";
  memberCount: number;
  weeklyReduction: number;
  image?: string;
}

// ---- Education ----
export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedMinutes: number;
  xpReward: number;
  completed?: boolean;
}

// ---- AI ----
export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface AIConversation {
  id: string;
  userId: string;
  type: "coach" | "scanner" | "meal" | "travel" | "shopping";
  messages: AIMessage[];
  createdAt: Date;
}

// ---- Reports ----
export interface Report {
  id: string;
  userId: string;
  type: "weekly" | "monthly";
  period: string;
  totalEmissions: number;
  reduction: number;
  highlights: string[];
  generatedAt: Date;
}

// ---- Onboarding ----
export type TransportMode = "car" | "public" | "bike" | "walk" | "mixed";
export type DietType = "omnivore" | "pescatarian" | "vegetarian" | "vegan";
export type EnergySource = "grid" | "partial_renewable" | "full_renewable";
export type HousingType = "apartment" | "house" | "studio" | "shared";
export type ShoppingHabits = "frequent" | "moderate" | "minimal" | "secondhand";

export interface OnboardingData {
  transportMode: TransportMode;
  dailyCommute: number;
  dietType: DietType;
  mealPrep: "mostly_home" | "mixed" | "mostly_out";
  energySource: EnergySource;
  housingType: HousingType;
  householdSize: number;
  shoppingHabits: ShoppingHabits;
  wasteRecycling: boolean;
  wasteComposting: boolean;
}

// ---- Meal Planner ----
export interface MealPlan {
  id: string;
  day: string;
  meals: {
    type: "breakfast" | "lunch" | "dinner" | "snack";
    name: string;
    carbonKg: number;
    calories: number;
    cost: number;
  }[];
  totalCarbon: number;
}

// ---- Travel Planner ----
export interface TravelOption {
  mode: string;
  distance: number;
  duration: string;
  emissions: number;
  cost: number;
  recommended: boolean;
}

// ---- Analytics ----
export interface AnalyticsData {
  daily: { date: string; emissions: number }[];
  weekly: { week: string; emissions: number }[];
  monthly: { month: string; emissions: number }[];
  categoryTrends: {
    category: CarbonCategory;
    data: { period: string; value: number }[];
  }[];
  goals: {
    target: number;
    current: number;
    progress: number;
  };
}

// ---- Privacy ----
export interface PrivacySettings {
  dataSharing: boolean;
  analyticsTracking: boolean;
  communityVisibility: "public" | "friends" | "private";
  aiHistoryRetention: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

// ---- Notifications ----
export interface AppNotification {
  id: string;
  type: "achievement" | "challenge" | "community" | "system" | "ai";
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

// ---- API Response ----
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ---- Chart Data ----
export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface TrendData {
  period: string;
  current: number;
  previous: number;
}
