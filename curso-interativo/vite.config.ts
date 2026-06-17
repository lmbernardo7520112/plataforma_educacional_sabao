import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: './',
  build: {
    outDir: 'dist',
    emptyDirBeforeWrite: true,
    rollupOptions: {
      input: './index.html',
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
