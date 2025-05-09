import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  },
  server: {
    port : 3000,
    proxy: {
      '/api': {
        target: 'http://15.164.100.98:8080',
        changeOrigin: true
      }
    }
  }
});