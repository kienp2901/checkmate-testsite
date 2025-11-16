/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    include: ['pdfjs-dist'],
  },
  test: {
    globals: true,
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*'],
      exclude: ['src/**/*.stories.{js,jsx,ts,tsx}', '**/*.d.ts'],
      reporter: ['html'],
    },
    environmentMatchGlobs: [['**/*.test.tsx', 'jsdom']],
    setupFiles: ['./vitest-setup.ts'],
    env: loadEnv('', process.cwd(), ''),
  },
});


