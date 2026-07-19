# CMS / Editing Setup

## Current state
The site already includes Decap CMS at `/admin` and editable JSON/content sources for:
- site settings
- homepage
- about page
- contact page
- practice areas
- FAQ
- articles

## Important limitation
Because the site is hosted on GitHub Pages, Decap CMS still needs a real authentication backend for smooth non-technical editing.

## Recommended options
### Option 1 — Netlify Identity + Decap CMS
Best non-technical editing experience, but requires moving hosting from GitHub Pages.

### Option 2 — GitHub OAuth backend for Decap CMS
Keep GitHub Pages, add a small auth backend (for example through a lightweight OAuth bridge / static-cms-auth service).
This is the best fit if hosting must stay on GitHub Pages.

### Option 3 — Git-based editing only
Edit JSON / Markdown directly in GitHub web UI. Technically simplest, less friendly for non-technical users.

## Recommendation
If GitHub Pages must remain the host, implement GitHub OAuth for Decap CMS as the next infra task.
Until then, content can still be updated via GitHub web editing.

## Files already prepared
- `public/admin/index.html`
- `public/admin/config.yml`
- `src/data/site-settings.json`
- `src/data/home-page.json`
- `src/data/about-page.json`
- `src/data/contact-page.json`
- `src/content/practiceAreas/*`
- `src/content/faq/*`
- `src/content/articles/*`
