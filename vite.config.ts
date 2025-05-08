import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  },
  server: {
    proxy: {
      '/api': {
        // target: 'http://3.39.56.196:8080',
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
});