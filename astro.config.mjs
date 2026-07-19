// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://erez1980.github.io',
  base: '/elib-law-modern',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  legacy: {
    collectionsBackwardsCompat: true,
  },
});
