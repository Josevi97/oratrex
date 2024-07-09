import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
  },
  resolve: {
    alias: {
      '@': new URL('src', import.meta.url).pathname,
      '@styles': new URL('src/styles', import.meta.url).pathname,
      '@img': new URL('src/assets/img', import.meta.url).pathname,
    },
  },
});
