import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
// import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'https://harper-ai.com',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    // sitemap({
    //   // Sitemap options
    //   changefreq: 'weekly',
    //   priority: 0.7,
    //   lastmod: new Date(),
    // }),
  ],
  output: 'static',
  build: {
    format: 'directory',
    // Inline small CSS and JS for better performance
    inlineStylesheets: 'auto',
  },
  vite: {
    ssr: {
      noExternal: ['@radix-ui/*'],
    },
    build: {
      // Optimize build for production
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor chunks for better caching
            'react-vendor': ['react', 'react-dom'],
            'radix-vendor': ['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          },
        },
      },
    },
  },
  // Compression and optimization
  compressHTML: true,
});