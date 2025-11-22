import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/reddit-api': {
        target: 'https://www.reddit.com',
        changeOrigin: true,
        rewrite: (path) => {
          // Extract query parameters from the path
          const url = new URL(path, 'http://localhost');
          const endpoint = url.searchParams.get('endpoint');
          const params = new URLSearchParams(url.searchParams);
          params.delete('endpoint');
          
          // Build the Reddit URL
          const queryString = params.toString();
          return `/${endpoint}${queryString ? '?' + queryString : ''}`;
        },
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('User-Agent', 'web:my-reddit-search-app.netlify.app:v1.0.0 (by /u/your_reddit_username)');
          });
        }
      }
    }
  }
})