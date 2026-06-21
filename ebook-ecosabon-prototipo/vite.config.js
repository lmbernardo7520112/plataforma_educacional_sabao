import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Relative paths for offline/portable execution
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  }
});
