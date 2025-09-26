import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    fs: { strict: false },
  // Proxy API requests in development to the backend server.
  //
  // Note: If you deploy a static-only site and use Formspree via
  // `VITE_FORMSPREE_ENDPOINT`, you can safely remove or comment out
  // the `proxy` section below. Keeping it is harmless and provides a
  // convenient local fallback to `/api/contact` if you also run the
  // backend during development.
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5002',
        changeOrigin: true,
        secure: false
      }
    }
  },
  preview: {
    // Ensure preview also falls back to index.html for client routes
    host: '127.0.0.1',
    port: 4173
  }
})
