// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://mensik-reality.cz', // Replace with actual domain
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/admin': {
          target: 'http://localhost:3333',
          changeOrigin: true,
        },
      },
    },
  },
  // Enable SSG for all pages
  output: 'static',
  // Image optimization
  image: {
    domains: ['cdn.sanity.io', 'images.unsplash.com'],
  },
});