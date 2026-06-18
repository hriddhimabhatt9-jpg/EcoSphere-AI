// ============================================================
// EcoSphere AI — Shared Utility Functions
// ============================================================

export type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[];

/**
 * Combine CSS class names, supporting strings, booleans, and objects
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
 * Format a number as kg CO₂e
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
 * Format carbon as a short number
 */
export function formatCarbonShort(kg: number): string {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)}t`;
  }
  return `${kg.toFixed(1)}kg`;
}

/**
 * Format a number with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

/**
 * Format a compact number (e.g., 1.2K, 3.4M)
 */
export function formatCompact(num: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
}

/**
 * Format a percentage
 */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format a date relative to now
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
 * Format a date as a short string
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Get initials from a name
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
 * Calculate eco score (0-100) from emissions
 * Average person: ~10,000 kg CO₂e/year → score ~50
 * Target: < 2,000 kg CO₂e/year → score ~100
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
 * Get eco score color based on value
 */
export function getScoreColor(score: number): string {
  if (score >= 80) return "var(--accent-green)";
  if (score >= 60) return "var(--accent-teal)";
  if (score >= 40) return "var(--accent-amber)";
  if (score >= 20) return "hsl(25, 95%, 53%)";
  return "var(--accent-rose)";
}

/**
 * Get category display info
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
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Debounce function
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
 * Sleep for a given duration
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Truncate text to a max length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}

/**
 * Get a greeting based on time of day
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
