# elib-law-modern

אתר חדש לעו"ד אליזבט ברזאני דדון, מבוסס Astro + GitHub Pages + Decap CMS.

## מה יש כרגע
- RTL מלא
- עמודי בסיס: ראשי, אודות, תחומי עיסוק, FAQ, צור קשר, מאמרים
- Decap CMS בנתיב `/admin`
- טופס מחובר דרך FormSubmit למייל `Elib-law@gmail.com`
- הכנה ל-GitHub Pages דרך GitHub Actions

## פיתוח מקומי
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## פרסום
ה־workflow ב-`.github/workflows/deploy.yml` מפרסם ל-GitHub Pages על כל push ל-`main`.

## מה עוד נשאר
- להחליף ללוגו המקורי כשתספק קובץ איכותי
- להוסיף קישור WhatsApp בהגדרות `src/data/site-settings.json`
- לשקול מעבר מטופס FormSubmit לשירות עם domain/email מותאם אישית בהמשך
- לשפר את Decap CMS כדי לערוך גם `site settings` ו-`home` בצורה מלאה דרך JSON/YAML
