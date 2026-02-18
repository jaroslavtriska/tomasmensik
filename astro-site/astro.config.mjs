// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://mensik-reality.cz', // Replace with actual domain
  output: 'static', // většina stránek statická, Zrealizováno se renderuje na požádání (prerender = false)
  // Adapter není potřeba - Vercel automaticky detekuje Astro a správně nakonfiguruje nastavení
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
  // Image optimization
  image: {
    domains: ['cdn.sanity.io', 'images.unsplash.com'],
  },
});