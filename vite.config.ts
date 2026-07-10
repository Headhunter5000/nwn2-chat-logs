/// <reference types="vitest" />

import yaml from '@rollup/plugin-yaml';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config'; // ← change this
import pkg from './package.json';

export default defineConfig({
  plugins: [react(), yaml()],
  base: '/nwn2-chat-logs/',
  logLevel: 'info',
  resolve: {
    alias: [
      {
        find: /^grommet-icons(\/.*)?$/,
        replacement: path.resolve(__dirname, './src/utils/grommetIconsMock.ts'),
      },
    ],
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    include: ['src/**/*.test.{ts,tsx}'],
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        pure_getters: true,
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
      format: {
        comments: false,
      },
      mangle: {
        toplevel: true,
      },
    },
    rollupOptions: {
      treeshake: {
        moduleSideEffects: 'no-external',
        propertyReadSideEffects: false,
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const directories = id.toString().split('node_modules/');

            if (directories.length > 1) {
              const packageName = directories[1].split('/')[0];

              switch (packageName) {
              case 'react':
              case 'react-dom':
              case 'react-router':
              case 'react-router-dom':
                return 'react-core';
              default:
                return `vendor-${packageName}`;
              }
            }
          }
        },
      },
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
});
