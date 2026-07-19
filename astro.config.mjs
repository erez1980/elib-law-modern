// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://elib-law.co.il',
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
  legacy: {
    collectionsBackwardsCompat: true,
  },
});
