// Prerenders key pages' real content into static HTML at build time so AI
// crawlers that don't execute JS see meaningful text (H1s, paragraphs) instead
// of an empty #root. The client bundle still mounts over this normally
// (createRoot, not hydrateRoot) so visible behavior is unchanged for real users.
//
// Home is injected into dist/index.html directly. Every other route gets its
// own dist/<route>/index.html (same shell, different #root content + <title>/
// <meta description>) so a direct, non-JS request to e.g. /about or /contact
// returns real content instead of falling through to the 404 page.
import { createServer } from 'vite';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distDir = path.join(root, 'dist');
const template = readFileSync(path.join(distDir, 'index.html'), 'utf-8');

const routes = [
  {
    urlPath: '/',
    outFile: 'index.html',
    module: '/src/pages/Home.jsx',
  },
  {
    urlPath: '/about',
    outFile: 'about/index.html',
    module: '/src/pages/About.jsx',
    title: 'אודות המשרד | ברזילי, עזורי ושות׳ עורכי דין',
    description: 'משרד ברזילי, עזורי ושות׳ עורכי דין בפתח תקווה — שני שותפים, התמחות בנדל"ן, התחדשות עירונית, צוואות, ירושות וייפוי כוח מתמשך.',
  },
  {
    urlPath: '/contact',
    outFile: 'contact/index.html',
    module: '/src/pages/Contact.jsx',
    title: 'צור קשר | ברזילי, עזורי ושות׳ עורכי דין',
    description: 'צרו קשר עם משרד ברזילי, עזורי ושות׳ עורכי דין: כתובת, טלפון, וואטסאפ, דוא"ל וטופס יצירת קשר לתיאום פגישת ייעוץ.',
  },
  {
    urlPath: '/privacy',
    outFile: 'privacy/index.html',
    module: '/src/pages/Privacy.jsx',
    title: 'הצהרת פרטיות | ברזילי, עזורי ושות׳ עורכי דין',
    description: 'הצהרת הפרטיות של אתר ברזילי, עזורי ושות׳ עורכי דין: איזה מידע נאסף, לאיזו מטרה ואיך הוא מוגן.',
  },
];

const vite = await createServer({
  root,
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
});

for (const route of routes) {
  const { default: Page } = await vite.ssrLoadModule(route.module);
  const html = renderToStaticMarkup(
    React.createElement(StaticRouter, { location: route.urlPath }, React.createElement(Page))
  );

  let page = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  if (page === template) {
    throw new Error(`prerender: could not find <div id="root"></div> for ${route.urlPath}`);
  }
  if (route.title) {
    page = page.replace(/<title>.*?<\/title>/s, `<title>${route.title}</title>`);
  }
  if (route.description) {
    page = page.replace(
      /<meta name="description" content=".*?" \/>/s,
      `<meta name="description" content="${route.description}" />`
    );
  }

  const outPath = path.join(distDir, route.outFile);
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, page);
  console.log(`prerender: wrote ${route.outFile} (${html.length} chars of static content)`);
}

await vite.close();
