/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Vitest-specific options
    globals: true,          // allow using `describe`, `it`, `expect` without imports
    environment: 'jsdom',   // ensures `document` and `window` exist
    setupFiles: './src/setupTests.ts', // optional, for jest-dom or other setup
  },
  // esbuild: {
  //   loader: 'jsx',
  // },
  // optimizeDeps: {
  //   force: true,
  //   esbuildOptions: {
  //     loader: {
  //       '.js': 'jsx',
  //       '.ts': 'jsx',
  //     },
  //   },
  // },
});
