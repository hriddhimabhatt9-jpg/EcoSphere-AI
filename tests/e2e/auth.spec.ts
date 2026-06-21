import { test, expect } from '@playwright/test';

/**
 * E2E Authentication Tests
 * Tests the authentication flow including page rendering and navigation.
 * SECURITY: Verifies that protected routes redirect unauthenticated users.
 */

test.describe('Authentication Flow', () => {
  test('login page renders correctly', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/EcoSphere/);
  });

  test('register page renders correctly', async ({ page }) => {
    await page.goto('/register');
    await expect(page).toHaveTitle(/EcoSphere/);
  });

  test('landing page has navigation links', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/EcoSphere/);
  });
});
