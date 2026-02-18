// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://mensik-reality.cz', // Replace with actual domain
  output: 'hybrid', // většina stránek statická, Zrealizováno se renderuje na požádání (aktuální data z Sanity)
  adapter: vercel({
    functionPerRoute: false,
  }),
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