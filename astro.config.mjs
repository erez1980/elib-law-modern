// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// Real last-modified dates for the sitemap, taken from each article's
// updatedDate (or publishDate). Other pages get no lastmod rather than a
// made-up one, which Google would learn to ignore.
const articleLastmod = Object.fromEntries(
  readdirSync('./src/content/articles')
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const source = readFileSync(`./src/content/articles/${file}`, 'utf8');
      const date = (source.match(/^updatedDate:\s*"?(\d{4}-\d{2}-\d{2})/m) ?? source.match(/^publishDate:\s*"?(\d{4}-\d{2}-\d{2})/m))?.[1];
      return [`https://elib-law.co.il/articles/${file.replace(/\.md$/, '')}/`, date];
    })
    .filter(([, date]) => date),
);

export default defineConfig({
  site: 'https://elib-law.co.il',
  output: 'static',
  trailingSlash: 'always',
  // Legacy WordPress URLs that still surface in Google (per Search Console)
  // and currently 404 — redirect them so their equity flows to the new pages.
  redirects: {
    '/ראשי': '/',
    '/אודות': '/about/',
    '/צרו-קשר': '/contact/',
    // Merged thin duplicates into their full guides (keyword cannibalization).
    '/articles/lasting-power-attorney': '/articles/lasting-power-attorney-guide/',
    '/articles/child-support-basics': '/articles/child-support-calculation/',
    '/articles/welcome': '/articles/',
  },
  // /thank-you/ is a post-submit utility page carrying <meta robots="noindex">;
  // listing it in the sitemap only invites Search Console to flag it.
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/thank-you/'),
      serialize: (item) => (articleLastmod[item.url] ? { ...item, lastmod: articleLastmod[item.url] } : item),
    }),
  ],
  legacy: {
    collectionsBackwardsCompat: true,
  },
  security: {
    // GitHub Pages cannot send response headers, so the Content-Security-Policy
    // ships as a <meta http-equiv> instead. Astro hashes every inline script and
    // style at build time, which keeps the policy strict — no 'unsafe-inline'.
    //
    // Two directives cannot work from a meta tag and still need a real header:
    // frame-ancestors (X-Frame-Options) and Strict-Transport-Security. Same for
    // X-Content-Type-Options and Permissions-Policy. Putting the site behind a
    // proxy that can set headers is the only way to close those.
    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        // The contact form posts to FormSubmit.
        "form-action 'self' https://formsubmit.co",
        "img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com",
        "font-src 'self'",
        "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
      ],
      scriptDirective: {
        // gtag.js is injected on the load event.
        resources: ["'self'", 'https://www.googletagmanager.com'],
      },
      styleDirective: {
        resources: ["'self'"],
      },
    },
  },
});
