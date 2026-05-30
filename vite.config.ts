import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',  // Always use root path since we're using a custom domain
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    sourcemap: process.env.VITE_BUILD_SOURCEMAP === 'true'
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production'
          ? 'https://www.gyotechnologies.com.ar'
          : 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug'
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
