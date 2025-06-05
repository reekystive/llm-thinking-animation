/// <reference types="vitest/config" />

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { bannerContent } from './scripts/banner.mjs';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    rollupOptions: { output: { banner: bannerContent } },
  },
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  test: {},
  base: '/llm-thinking-animation/',
});
