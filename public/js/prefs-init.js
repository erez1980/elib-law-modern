// Restores the visitor's saved theme and accessibility preferences before the
// first paint, so neither flashes the wrong state on load.
//
// This runs from an external file rather than inline because the site ships a
// hash-based Content-Security-Policy: same-origin files are covered by
// 'self', while an inline block would need its hash re-registered on every
// edit. It is deliberately render-blocking — deferring it is what causes the
// flash it exists to prevent. Keep it small.
(() => {
  // www.elib-law.co.il serves the same pages instead of redirecting (GitHub
  // Pages cannot send a 301 for it unless DNS is set up that way), and Search
  // Console reports it as a separate site. Send visitors and Google to the
  // canonical host; Google follows a JS redirect like a server one.
  if (location.hostname === 'www.elib-law.co.il') {
    location.replace(`https://elib-law.co.il${location.pathname}${location.search}${location.hash}`);
    return;
  }

  const root = document.documentElement;

  try {
    const saved = localStorage.getItem('elib-theme');
    root.dataset.theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch {
    root.dataset.theme = 'light';
  }

  try {
    const a11y = JSON.parse(localStorage.getItem('elib-a11y') || '{}');
    root.dataset.a11yFont = String(a11y.fontScale || 0);
    root.toggleAttribute('data-a11y-contrast', !!a11y.contrast);
    root.toggleAttribute('data-a11y-links', !!a11y.links);
    root.toggleAttribute('data-a11y-readable-font', !!a11y.readableFont);
    root.toggleAttribute('data-a11y-reduce-motion', !!a11y.motion);
  } catch {
    /* no saved preferences — defaults already apply */
  }
})();
