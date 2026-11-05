// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { copyFileSync, existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

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

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path, out);
    else out.push(path);
  }
  return out;
}

// GitHub Pages cannot send an HTTP 301 for an arbitrary path (www → apex
// already 301s, because public/CNAME is the apex). Astro's static redirect
// is an immediate meta refresh plus a canonical, which Google treats as a
// redirect — but the generated file also includes noindex, and Search
// Console then files the URL under "Excluded by noindex" instead. Drop that
// tag, and point the refresh at the absolute canonical URL.
// Also publish /sitemap.xml as a copy of the index. Crawlers request that
// path by default, and it currently 404s even though sitemap-index.xml is fine.
function redirectStubSeo() {
  return {
    name: 'redirect-stub-seo',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const root = fileURLToPath(dir);
        for (const file of walk(root)) {
          if (!file.endsWith('.html')) continue;
          const html = readFileSync(file, 'utf8');
          if (!html.includes('http-equiv="refresh"') || !html.includes('<meta name="robots" content="noindex">')) continue;
          const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
          let next = html.replace('<meta name="robots" content="noindex">', '');
          if (canonical) {
            next = next.replace(
              /<meta http-equiv="refresh" content="\d+;url=[^"]+">/,
              `<meta http-equiv="refresh" content="0;url=${canonical}">`,
            );
          }
          writeFileSync(file, next);
        }
        const index = join(root, 'sitemap-index.xml');
        if (!existsSync(index)) throw new Error('sitemap-index.xml was not written; refusing to skip /sitemap.xml');
        copyFileSync(index, join(root, 'sitemap.xml'));
      },
    },
  };
}

export default defineConfig({
  site: 'https://elib-law.co.il',
  output: 'static',
  trailingSlash: 'always',
  // Legacy URLs that 404 today. Keys are the public path without a trailing
  // slash; `trailingSlash: 'always'` publishes each one as a directory.
  // Targets always include the trailing slash so the stub does not chain
  // into GitHub Pages' own slash redirect.
  redirects: {
    // WordPress pages already seen in Search Console, plus the same Hebrew
    // slug pattern for the other main sections.
    '/ראשי': '/',
    '/אודות': '/about/',
    '/צרו-קשר': '/contact/',
    '/צור-קשר': '/contact/',
    '/יצירת-קשר': '/contact/',
    '/home': '/',
    '/about-us': '/about/',
    '/contact-us': '/contact/',
    '/privacy-policy': '/privacy/',
    '/מדיניות-פרטיות': '/privacy/',
    '/פרטיות': '/privacy/',
    '/נגישות': '/accessibility-statement/',
    '/הצהרת-נגישות': '/accessibility-statement/',
    '/שאלות-נפוצות': '/faq/',
    '/דיני-משפחה': '/practice-areas/',
    '/תחומי-עיסוק': '/practice-areas/',
    '/שירותים': '/practice-areas/',
    '/גירושין': '/services/divorce-lawyer/',
    '/מזונות': '/services/child-support-lawyer/',
    '/משמורת': '/services/custody-lawyer/',
    '/צוואות': '/services/will-lawyer/',
    '/ירושות': '/services/will-lawyer/',
    '/גישור': '/services/family-mediation/',
    '/גישור-משפחתי': '/services/family-mediation/',
    '/הסכם-ממון': '/services/prenup-lawyer/',
    '/הסכמי-ממון': '/services/prenup-lawyer/',
    '/ייפוי-כוח-מתמשך': '/services/lasting-power-attorney-lawyer/',
    '/חלוקת-רכוש': '/services/property-division-lawyer/',
    '/מאמרים': '/articles/',
    '/בלוג': '/articles/',
    // Merged thin duplicates into their full guides.
    '/articles/lasting-power-attorney': '/articles/lasting-power-attorney-guide/',
    '/articles/child-support-basics': '/articles/child-support-calculation/',
    '/articles/welcome': '/articles/',
    '/articles/divorce-cost': '/articles/divorce-cost-israel/',
    '/articles/child-support': '/articles/child-support-calculation/',
    // /services/divorce-lawyer/ exists; the parent /services/ does not, and
    // Google crawls the parent of every sitemap URL.
    '/services': '/practice-areas/',
    '/blog': '/articles/',
    // WordPress archives that robots.txt does not block, so they show up as
    // "Not found" rather than "Blocked by robots.txt".
    '/feed': '/articles/',
    '/comments/feed': '/articles/',
    '/category': '/articles/',
    '/tag': '/articles/',
    '/author': '/about/',
    '/page/2': '/articles/',
    // City slugs the URL pattern suggests, but which have no page.
    '/areas/kadima': '/',
    '/areas/kadima-zoran': '/',
    '/areas/sharon': '/areas/',
  },
  // /thank-you/ is a post-submit utility page carrying <meta robots="noindex">;
  // listing it in the sitemap only invites Search Console to flag it.
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/thank-you/'),
      serialize: (item) => (articleLastmod[item.url] ? { ...item, lastmod: articleLastmod[item.url] } : item),
    }),
    redirectStubSeo(),
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
