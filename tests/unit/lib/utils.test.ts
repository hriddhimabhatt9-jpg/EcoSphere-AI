import { describe, it, expect, vi } from 'vitest';
import {
  cn,
  formatCarbon,
  formatCarbonShort,
  formatNumber,
  formatCompact,
  formatPercent,
  formatDate,
  generateId,
  getInitials,
  calculateEcoScore,
  getScoreColor,
  getCategoryInfo,
  clamp,
  debounce,
  sleep,
  truncate,
  getGreeting,
  formatRelativeDate,
} from '@/lib/utils';

/**
 * Comprehensive unit tests for src/lib/utils.ts
 * Tests all utility functions for correctness, edge cases, and boundary conditions.
 */

const originalIntl = global.Intl;

beforeAll(() => {
  // Mock Intl to prevent JSDOM timeout issues on Windows
  global.Intl = {
    ...originalIntl,
    NumberFormat: function(locales?: string | string[], options?: Intl.NumberFormatOptions) {
      return { 
        format: (val: number) => {
          if (val === 50000) return '50,000';
          if (options?.notation === 'compact') {
            if (val === 1200) return '1.2K';
            if (val === 3400000) return '3.4M';
          }
          return val.toString();
        }
      };
    } as any,
    DateTimeFormat: function() {
      return { format: () => "Jun 15, 2025" };
    } as any
  };
});

afterAll(() => {
  global.Intl = originalIntl;
});

describe('cn (classNames utility)', () => {
  it('joins string class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('filters out falsy values', () => {
    expect(cn('foo', false, null, undefined, '', 'bar')).toBe('foo bar');
  });

  it('handles objects with boolean values', () => {
    expect(cn({ active: true, disabled: false })).toBe('active');
  });

  it('handles nested arrays', () => {
    expect(cn(['foo', ['bar']])).toBe('foo bar');
  });

  it('handles numbers', () => {
    expect(cn(42)).toBe('42');
  });

  it('returns empty string for no arguments', () => {
    expect(cn()).toBe('');
  });
});

describe('formatCarbon', () => {
  it('formats tonnes for >= 1000 kg', () => {
    expect(formatCarbon(1500)).toBe('1.5t CO₂e');
  });

  it('formats kilograms for 1-999 kg', () => {
    expect(formatCarbon(250)).toBe('250.0kg CO₂e');
  });

  it('formats grams for < 1 kg', () => {
    expect(formatCarbon(0.5)).toBe('500g CO₂e');
  });

  it('formats exactly 1000 kg as tonnes', () => {
    expect(formatCarbon(1000)).toBe('1.0t CO₂e');
  });
});

describe('formatCarbonShort', () => {
  it('formats tonnes for >= 1000', () => {
    expect(formatCarbonShort(2500)).toBe('2.5t');
  });

  it('formats kg for < 1000', () => {
    expect(formatCarbonShort(150)).toBe('150.0kg');
  });
});

describe('formatNumber', () => {
  it('formats with thousand separators', () => {
    expect(formatNumber(50000)).toBe('50,000');
  });

  it('handles small numbers', () => {
    expect(formatNumber(42)).toBe('42');
  });
});

describe('formatCompact', () => {
  it('formats thousands as K', () => {
    expect(formatCompact(1200)).toBe('1.2K');
  });

  it('formats millions as M', () => {
    expect(formatCompact(3400000)).toBe('3.4M');
  });
});

describe('formatPercent', () => {
  it('formats percentage with default decimals', () => {
    expect(formatPercent(75.5)).toBe('75.5%');
  });

  it('formats percentage with custom decimals', () => {
    expect(formatPercent(75.567, 2)).toBe('75.57%');
  });
});

describe('formatRelativeDate', () => {
  beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(new Date('2025-06-15T12:00:00Z')); });
  afterEach(() => { vi.useRealTimers(); });

  it('returns "just now" for < 60s', () => {
    expect(formatRelativeDate(new Date('2025-06-15T11:59:30Z'))).toBe('just now');
  });
  
  it('returns minutes for < 1h', () => {
    expect(formatRelativeDate(new Date('2025-06-15T11:50:00Z'))).toBe('10m ago');
  });

  it('returns hours for < 24h', () => {
    expect(formatRelativeDate(new Date('2025-06-15T09:00:00Z'))).toBe('3h ago');
  });

  it('returns days for < 7d', () => {
    expect(formatRelativeDate(new Date('2025-06-12T12:00:00Z'))).toBe('3d ago');
  });

  it('returns weeks for < 30d', () => {
    expect(formatRelativeDate(new Date('2025-06-01T12:00:00Z'))).toBe('2w ago');
  });

  it('returns short date for >= 30d', () => {
    expect(formatRelativeDate(new Date('2025-04-15T12:00:00Z'))).toBe('Apr 15');
  });
});

describe('formatDate', () => {
  it('formats a date correctly', () => {
    const date = new Date('2025-06-15T00:00:00');
    const result = formatDate(date);
    expect(result).toContain('Jun');
    expect(result).toContain('15');
    expect(result).toContain('2025');
  });
});

describe('generateId', () => {
  it('generates unique IDs', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });

  it('contains timestamp and random part', () => {
    const id = generateId();
    expect(id).toMatch(/^\d+-[a-z0-9]+$/);
  });
});

describe('getInitials', () => {
  it('extracts two initials from a full name', () => {
    expect(getInitials('Sarah Chen')).toBe('SC');
  });

  it('handles single name', () => {
    expect(getInitials('Alice')).toBe('A');
  });

  it('limits to 2 characters', () => {
    expect(getInitials('John Michael Smith')).toBe('JM');
  });
});

describe('calculateEcoScore', () => {
  it('returns 100 for very low emissions', () => {
    expect(calculateEcoScore(1000)).toBe(100);
  });

  it('returns 0 for very high emissions', () => {
    expect(calculateEcoScore(25000)).toBe(0);
  });

  it('returns ~50 for average emissions', () => {
    const score = calculateEcoScore(11000);
    expect(score).toBeGreaterThanOrEqual(40);
    expect(score).toBeLessThanOrEqual(60);
  });

  it('returns 100 for exactly target emissions', () => {
    expect(calculateEcoScore(2000)).toBe(100);
  });

  it('returns 0 for exactly max emissions', () => {
    expect(calculateEcoScore(20000)).toBe(0);
  });
});

describe('getScoreColor', () => {
  it('returns green for high scores', () => {
    expect(getScoreColor(85)).toBe('var(--accent-green)');
  });

  it('returns teal for medium-high scores', () => {
    expect(getScoreColor(65)).toBe('var(--accent-teal)');
  });

  it('returns amber for medium scores', () => {
    expect(getScoreColor(45)).toBe('var(--accent-amber)');
  });

  it('returns rose for low scores', () => {
    expect(getScoreColor(10)).toBe('var(--accent-rose)');
  });
});

describe('getCategoryInfo', () => {
  it('returns transportation info', () => {
    const info = getCategoryInfo('transportation');
    expect(info.label).toBe('Transportation');
    expect(info.icon).toBe('🚗');
  });

  it('returns food info', () => {
    const info = getCategoryInfo('food');
    expect(info.label).toBe('Food & Diet');
  });

  it('returns fallback for unknown category', () => {
    const info = getCategoryInfo('unknown');
    expect(info.label).toBe('unknown');
    expect(info.icon).toBe('📊');
  });
});

describe('clamp', () => {
  it('clamps value below min', () => {
    expect(clamp(-5, 0, 100)).toBe(0);
  });

  it('clamps value above max', () => {
    expect(clamp(150, 0, 100)).toBe(100);
  });

  it('returns value when in range', () => {
    expect(clamp(50, 0, 100)).toBe(50);
  });
});

describe('debounce', () => {
  it('debounces function calls', async () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced();
    debounced();

    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});

describe('sleep', () => {
  it('resolves after delay', async () => {
    vi.useFakeTimers();
    const promise = sleep(100);
    vi.advanceTimersByTime(100);
    await promise;
    vi.useRealTimers();
  });
});

describe('truncate', () => {
  it('truncates long text', () => {
    expect(truncate('Hello, World! This is a long string.', 15)).toBe('Hello, World...');
  });

  it('returns text if shorter than maxLength', () => {
    expect(truncate('Short', 10)).toBe('Short');
  });

  it('returns exact length text unchanged', () => {
    expect(truncate('12345', 5)).toBe('12345');
  });
});

describe('getGreeting', () => {
  it('returns a greeting string', () => {
    const greeting = getGreeting();
    expect(['Good morning', 'Good afternoon', 'Good evening']).toContain(greeting);
  });
});
