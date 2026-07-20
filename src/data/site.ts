import siteSettings from './site-settings.json';

export const site = siteSettings;

export const navigation = [
  { label: 'ראשי', href: '/' },
  { label: 'אודות', href: '/about' },
  { label: 'תחומי עיסוק', href: '/practice-areas' },
  { label: 'שאלות נפוצות', href: '/faq' },
  { label: 'מאמרים', href: '/articles' },
  { label: 'צור קשר', href: '/contact' },
];

export const highlights = [
  {
    title: 'ליווי אישי וישיר',
    text: 'כל תיק מטופל באופן אישי, רגיש ודיסקרטי, בסטנדרט מקצועי גבוה ובליווי מוקפד לאורך כל הדרך.',
  },
  {
    title: 'מיקוד מקצועי בדיני משפחה',
    text: 'גירושין, מזונות, משמורת, רכוש, צוואות, ירושות, ייפוי כוח מתמשך והסכמים - תחת מומחיות אחת ברורה.',
  },
  {
    title: 'אסטרטגיה משפטית שקולה',
    text: 'לא כל מקרה צריך לרוץ ישר לעימות. המשרד בוחן מה נכון, מה יעיל, ומה ישרת את הלקוח לטווח ארוך.',
  },
  {
    title: 'בהירות בתוך תקופה מורכבת',
    text: 'המטרה היא להוריד עומס, להסביר את האפשרויות, ולתת תחושת כיוון וביטחון כבר מהשלבים הראשונים.',
  },
];

export const contactCards = [
  { label: 'טלפון', value: site.phone, href: `tel:${site.phone.replace(/-/g, '')}` },
  { label: 'אימייל', value: site.email, href: `mailto:${site.email}` },
  { label: 'כתובת', value: 'רחוב ראשי שדות 16, קדימה צורן', href: 'https://maps.google.com/?q=רחוב+ראשי+שדות+16,+קדימה+צורן' },
  { label: 'WhatsApp', value: 'שליחת הודעה', href: site.whatsapp || '/contact' },
];
