/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config'; // ← change this
import pkg from './package.json';

export default defineConfig({
  plugins: [react()],
  base: '/nwn2-chat-logs/',
  server: {
    port: 3000,
  },
  preview: {
    port: 8080,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    include: ['src/**/*.test.{ts,tsx}'],
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
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
