// Generates dist/sitemap.xml and a Markdown twin of every indexable page
// (dist/<route>.md) used by middleware.js for Accept: text/markdown negotiation.
import { createServer } from 'vite';
import { mkdirSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const BASE_URL = 'https://www.baz-law.co.il';
const today = new Date().toISOString().slice(0, 10);

const vite = await createServer({
  root,
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
});

const { practiceAreas } = await vite.ssrLoadModule('/src/data/practiceAreas.jsx');
const { attorneys } = await vite.ssrLoadModule('/src/data/attorneys.js');
const { articles } = await vite.ssrLoadModule('/src/data/articles.js');
await vite.close();

const pages = [
  { path: '/', lastmod: today, title: 'ברזילי, עזורי ושות׳ | משרד עורכי דין', body: 'משרד עורכי דין המתמחה בעסקאות נדל"ן, התחדשות עירונית, רישום זכויות, צוואות, ירושות וייפוי כוח מתמשך.' },
  { path: '/practice-areas', lastmod: today, title: 'תחומי עיסוק', body: 'סקירת תחומי העיסוק של המשרד: ' + practiceAreas.map((a) => a.title).join(', ') + '.' },
  { path: '/articles', lastmod: today, title: 'מאמרים', body: 'מאמרים משפטיים מאת ' + 'ברזילי, עזורי ושות׳.' },
  { path: '/about', lastmod: today, title: 'אודות המשרד', body: 'משרד ברזילי, עזורי ושות׳ עורכי דין בפתח תקווה — שני שותפים, התמחות בנדל"ן, התחדשות עירונית, צוואות, ירושות וייפוי כוח מתמשך.' },
  { path: '/contact', lastmod: today, title: 'צור קשר', body: 'כתובת: זאב ז׳בוטינסקי 61, פתח תקווה. דוא"ל: office@baz-law.co.il. טלפונים: 054-2030535, 054-2531925.' },
  { path: '/terms', lastmod: today, title: 'תנאי שימוש', body: 'תנאי השימוש באתר ברזילי, עזורי ושות׳ עורכי דין.' },
  { path: '/privacy', lastmod: today, title: 'מדיניות פרטיות', body: 'מדיניות הפרטיות של אתר ברזילי, עזורי ושות׳ עורכי דין.' },
  { path: '/accessibility', lastmod: today, title: 'הצהרת נגישות', body: 'הצהרת הנגישות של אתר ברזילי, עזורי ושות׳ עורכי דין.' },
  ...practiceAreas.map((a) => ({
    path: a.canonicalPath,
    lastmod: today,
    title: a.seoTitle || a.title,
    body: [a.subtitle, a.intro].filter(Boolean).join('\n\n'),
  })),
  ...attorneys.map((a) => ({
    path: `/attorneys/${a.slug}`,
    lastmod: today,
    title: a.name,
    body: (Array.isArray(a.bio) ? a.bio.join('\n\n') : a.bio) || '',
  })),
  ...articles.map((a) => ({
    path: a.canonicalPath,
    lastmod: a.updatedAt || a.publishedAt || today,
    title: a.seoTitle || a.title,
    body: (a.content || [])
      .map((section) => `## ${section.heading}\n\n${(section.paragraphs || []).join('\n\n')}`)
      .join('\n\n'),
  })),
];

const sitemapEntries = pages
  .map((p) => `  <url>\n    <loc>${BASE_URL}${p.path}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n  </url>`)
  .join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;

const distDir = path.join(root, 'dist');
writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);

for (const p of pages) {
  const markdown = `# ${p.title}\n\n${p.body}\n\n[${BASE_URL}${p.path}](${BASE_URL}${p.path})\n`;
  const mdPath = p.path === '/' ? '/index.md' : `${p.path}.md`;
  const filePath = path.join(distDir, mdPath);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, markdown);
}

console.log(`generate-seo-files: wrote sitemap.xml (${pages.length} urls) and ${pages.length} markdown twins`);
