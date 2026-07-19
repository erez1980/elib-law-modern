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
    text: 'כל תיק מטופל באופן אישי, רגיש ודיסקרטי, ללא העברה למתמחים או סטודנטים.',
  },
  {
    title: 'ניסיון ממוקד בדיני משפחה',
    text: 'ייצוג וליווי בהליכי גירושין, מזונות, משמורת, רכוש, צוואות, ירושות וייפוי כוח מתמשך.',
  },
  {
    title: 'אסטרטגיה מדויקת לכל לקוח',
    text: 'שילוב של חשיבה משפטית, ראייה אנושית ויכולת להוביל תהליך מורכב בביטחון.',
  },
  {
    title: 'זמינות, בהירות ושקט נפשי',
    text: 'המסר באתר החדש יהיה ברור, מרגיע וענייני – בדיוק כמו שמצופה ממשרד בוטיק איכותי.',
  },
];

export const contactCards = [
  { label: 'טלפון', value: site.phone, href: `tel:${site.phone.replace(/-/g, '')}` },
  { label: 'אימייל', value: site.email, href: `mailto:${site.email}` },
  { label: 'כתובת', value: 'רחוב ראשי שדות 16, קדימה צורן', href: 'https://maps.google.com/?q=רחוב+ראשי+שדות+16,+קדימה+צורן' },
  { label: 'WhatsApp', value: site.whatsapp || 'יתווסף בהמשך', href: site.whatsapp || '/contact' },
];
