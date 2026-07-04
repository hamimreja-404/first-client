import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables for the current mode (development / production)
  const env = loadEnv(mode, process.cwd(), '');

  // Dev proxy target — falls back to localhost if env var is not set
  const backendUrl = env.VITE_API_BASE_URL || 'http://localhost:3000';

  return {
    server: {
      proxy: {
        '/api': {
          target: backendUrl,
          changeOrigin: true,
        },
      },
    },
    build: {
      rollupOptions: {
        input: {
          main:    resolve(__dirname, 'index.html'),
          admin:   resolve(__dirname, 'admin.html'),
          privacy: resolve(__dirname, 'privacy.html'),
          terms:   resolve(__dirname, 'terms.html'),
          refund:  resolve(__dirname, 'refund.html'),
        },
      },
    },
  };
});
