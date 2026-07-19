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
- לשקול מעבר מטופס FormSubmit לשירות עם domain/email מותאם אישית בהמשך
- להשלים auth נוח ל-Decap CMS עבור עריכה לא-טכנית אמיתית על GitHub Pages
- לחבר את הדומיין הקיים

## CMS / Editing
קיים מסמך תפעולי נוסף:
- `docs/CMS_SETUP.md`
