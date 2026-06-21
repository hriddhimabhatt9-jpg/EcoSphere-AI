/**
 * @module utils
 * @description EcoSphere AI — Shared Utility Functions.
 * Provides formatting, calculation, and DOM helper utilities used across the application.
 * SECURITY: All output is designed for use with React JSX (textContent), never innerHTML.
 */

/** @typedef {string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[]} ClassValue */
export type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[];

/**
 * Combines CSS class names, supporting strings, booleans, arrays, and objects.
 * Filters out falsy values and flattens nested arrays.
 * @param {...ClassValue} classes - Variable number of class name arguments
 * @returns {string} A single space-separated class name string
 */
export function cn(...classes: ClassValue[]): string {
  const result: string[] = [];
  for (const item of classes) {
    if (!item) continue;
    if (typeof item === 'string' || typeof item === 'number') {
      result.push(item.toString());
    } else if (Array.isArray(item)) {
      result.push(cn(...item));
    } else if (typeof item === 'object') {
      for (const key in item) {
        if (item[key]) result.push(key);
      }
    }
  }
  return result.join(" ");
}

/**
 * Formats a carbon emission value into a human-readable string with appropriate units.
 * Automatically selects tonnes, kilograms, or grams based on magnitude.
 * @param {number} kg - The carbon emission value in kilograms CO₂ equivalent
 * @returns {string} Formatted string with unit suffix (e.g., "1.5t CO₂e", "250.0kg CO₂e", "500g CO₂e")
 */
export function formatCarbon(kg: number): string {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)}t CO₂e`;
  }
  if (kg >= 1) {
    return `${kg.toFixed(1)}kg CO₂e`;
  }
  return `${(kg * 1000).toFixed(0)}g CO₂e`;
}

/**
 * Formats a carbon emission value as a short abbreviated string.
 * @param {number} kg - The carbon emission value in kilograms CO₂ equivalent
 * @returns {string} Abbreviated string (e.g., "1.5t" or "250.0kg")
 */
export function formatCarbonShort(kg: number): string {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)}t`;
  }
  return `${kg.toFixed(1)}kg`;
}

/**
 * Formats a number with locale-appropriate thousand separators.
 * @param {number} num - The number to format
 * @returns {string} Formatted number string (e.g., "50,000")
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

/**
 * Formats a number using compact notation (e.g., 1.2K, 3.4M).
 * @param {number} num - The number to format
 * @returns {string} Compact formatted string
 */
export function formatCompact(num: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
}

/**
 * Formats a numeric value as a percentage string.
 * @param {number} value - The percentage value
 * @param {number} [decimals=1] - Number of decimal places to display
 * @returns {string} Formatted percentage string (e.g., "75.5%")
 */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Formats a date as a human-readable relative time string.
 * Returns "just now", "Xm ago", "Xh ago", "Xd ago", "Xw ago", or a short date.
 * @param {Date} date - The date to format relative to the current time
 * @returns {string} A relative time string (e.g., "5m ago", "2d ago")
 */
export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Formats a date as a short localized string (e.g., "Jun 15, 2025").
 * @param {Date} date - The date to format
 * @returns {string} Short formatted date string
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Generates a unique identifier using timestamp and random characters.
 * Suitable for client-side entity identification, not cryptographic use.
 * @returns {string} A unique ID string (e.g., "1718900000000-a3b5c7d")
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Extracts up to two uppercase initials from a full name.
 * @param {string} name - The full name to extract initials from
 * @returns {string} One or two uppercase initial characters (e.g., "SC" for "Sarah Chen")
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

/**
 * Calculates an eco score from 0-100 based on yearly emissions.
 * Uses a linear scale between target (2,000 kg → 100) and maximum (20,000 kg → 0).
 * Average person (~10,000 kg CO₂e/year) scores approximately 50.
 * @param {number} yearlyEmissionsKg - Annual carbon emissions in kilograms CO₂ equivalent
 * @returns {number} Integer eco score between 0 (worst) and 100 (best)
 */
export function calculateEcoScore(yearlyEmissionsKg: number): number {
  const maxEmissions = 20000; // Very high emitter
  const targetEmissions = 2000; // Target for sustainability

  if (yearlyEmissionsKg <= targetEmissions) return 100;
  if (yearlyEmissionsKg >= maxEmissions) return 0;

  const ratio =
    (maxEmissions - yearlyEmissionsKg) / (maxEmissions - targetEmissions);
  return Math.round(ratio * 100);
}

/**
 * Returns a CSS color value corresponding to the eco score tier.
 * Green (80+), Teal (60-79), Amber (40-59), Orange (20-39), Rose (0-19).
 * @param {number} score - The eco score value (0-100)
 * @returns {string} A CSS color value or custom property reference
 */
export function getScoreColor(score: number): string {
  if (score >= 80) return "var(--accent-green)";
  if (score >= 60) return "var(--accent-teal)";
  if (score >= 40) return "var(--accent-amber)";
  if (score >= 20) return "hsl(25, 95%, 53%)";
  return "var(--accent-rose)";
}

/**
 * Returns display metadata (label, icon emoji, color) for a carbon category.
 * Falls back to a generic display if the category is not recognized.
 * @param {string} category - The carbon category identifier (e.g., "transportation", "food")
 * @returns {{ label: string, icon: string, color: string }} Display info object
 */
export function getCategoryInfo(category: string): {
  label: string;
  icon: string;
  color: string;
} {
  const categories: Record<
    string,
    { label: string; icon: string; color: string }
  > = {
    transportation: {
      label: "Transportation",
      icon: "🚗",
      color: "var(--accent-blue)",
    },
    food: { label: "Food & Diet", icon: "🍽️", color: "var(--accent-green)" },
    energy: { label: "Energy", icon: "⚡", color: "var(--accent-amber)" },
    shopping: { label: "Shopping", icon: "🛍️", color: "var(--accent-purple)" },
    waste: { label: "Waste", icon: "♻️", color: "var(--accent-teal)" },
    travel: { label: "Travel", icon: "✈️", color: "var(--accent-rose)" },
    appliances: {
      label: "Appliances",
      icon: "🏠",
      color: "hsl(25, 95%, 53%)",
    },
    lifestyle: {
      label: "Lifestyle",
      icon: "🌿",
      color: "var(--accent-green)",
    },
  };

  return (
    categories[category] || {
      label: category,
      icon: "📊",
      color: "var(--text-secondary)",
    }
  );
}

/**
 * Clamps a numeric value to be within the specified inclusive range.
 * @param {number} value - The value to clamp
 * @param {number} min - The minimum allowed value
 * @param {number} max - The maximum allowed value
 * @returns {number} The clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Creates a debounced version of the provided function that delays invocation
 * until the specified milliseconds have elapsed since the last call.
 * @param {Function} fn - The function to debounce
 * @param {number} ms - The debounce delay in milliseconds
 * @returns {Function} A debounced version of the input function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

/**
 * Returns a Promise that resolves after the specified delay.
 * @param {number} ms - The delay duration in milliseconds
 * @returns {Promise<void>} A Promise that resolves after the delay
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Truncates text to the specified maximum length, appending ellipsis if needed.
 * @param {string} text - The text to truncate
 * @param {number} maxLength - The maximum allowed character length (including ellipsis)
 * @returns {string} The original or truncated text with "..." suffix
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}

/**
 * Returns a time-appropriate greeting based on the current hour.
 * Morning (before 12), Afternoon (12-16), Evening (17+).
 * @returns {string} A greeting string ("Good morning", "Good afternoon", or "Good evening")
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
