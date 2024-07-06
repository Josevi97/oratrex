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
      '@styles': new URL('src/styles', import.meta.url).pathname,
      '@img': new URL('src/assets/img', import.meta.url).pathname,
    },
  },
});
