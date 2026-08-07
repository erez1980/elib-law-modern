// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://elib-law.co.il',
  output: 'static',
  trailingSlash: 'always',
  // Legacy WordPress URLs that still surface in Google (per Search Console)
  // and currently 404 — redirect them so their equity flows to the new pages.
  redirects: {
    '/ראשי': '/',
    '/אודות': '/about',
    '/צרו-קשר': '/contact',
  },
  // /thank-you/ is a post-submit utility page carrying <meta robots="noindex">;
  // listing it in the sitemap only invites Search Console to flag it.
  integrations: [sitemap({ filter: (page) => !page.endsWith('/thank-you/') })],
  legacy: {
    collectionsBackwardsCompat: true,
  },
});
