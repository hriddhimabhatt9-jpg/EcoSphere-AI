import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache', 'tests/e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'json-summary', 'lcov'],
      include: [
        'src/lib/calculator.ts', 
        'src/lib/gamification.ts', 
        'src/lib/validators.ts', 
        'src/lib/utils.ts',
        'src/actions/auth.ts'
      ],
      exclude: ['node_modules/', '.next/', '**/layout.tsx', 'tests/e2e/**'],
      thresholds: {
        lines: 95,
        functions: 95,
        branches: 95,
        statements: 95,
      }
    },
  },
});
