const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/**
 * Builds an internal URL under the site base.
 *
 * The site is built with `trailingSlash: 'always'`, so pages live at
 * `/about/index.html`. Linking to `/about` makes the host answer with a 301 to
 * `/about/`, which Search Console reports as "Page with redirect" — so page
 * paths always get the trailing slash here. Asset paths (anything ending in a
 * file extension) are passed through untouched.
 */
export function withBase(path: string): string {
  if (path === '/') return `${base}/`;
  const isAsset = /\.[a-z0-9]+$/i.test(path);
  const normalized = isAsset || path.endsWith('/') ? path : `${path}/`;
  return `${base}${normalized}`;
}
