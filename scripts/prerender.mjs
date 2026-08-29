// Prerenders every indexable route into its own static HTML file at build time.
//
// Two reasons this exists:
//   1. Routing. The host serves files, not routes. A path with no matching file
//      returns 404 — so every route in the sitemap needs a real index.html on
//      disk, or Google sees a 404 for a page users can reach fine via the SPA.
//   2. Content. Crawlers and link-preview bots (WhatsApp, Facebook) don't run
//      JS, so they need the H1s, paragraphs, <title>, description, canonical,
//      Open Graph tags and JSON-LD present in the served HTML — not applied
//      later by useSEO() on the client.
//
// Home is injected into dist/index.html directly. Every other route gets
// dist/<route>/index.html: same shell, its own #root content and head tags.
// The client bundle still mounts over this normally (createRoot, not
// hydrateRoot) so visible behavior is unchanged for real users.
import { createServer } from 'vite';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distDir = path.join(root, 'dist');
const template = readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Must match the host the site actually serves from: the apex domain redirects
// to www, and sitemap.xml (generate-seo-files.mjs) is built on www too.
const BASE_URL = 'https://www.baz-law.co.il';

const vite = await createServer({
  root,
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
});

const { practiceAreas, buildLegalServiceSchema } = await vite.ssrLoadModule('/src/data/practiceAreas.jsx');
const { articles, buildArticleSchema } = await vite.ssrLoadModule('/src/data/articles.js');
const { attorneys } = await vite.ssrLoadModule('/src/data/attorneys.js');

const staticRoutes = [
  {
    urlPath: '/',
    module: '/src/pages/Home.jsx',
  },
  {
    urlPath: '/practice-areas',
    module: '/src/pages/PracticeAreas.jsx',
    title: 'תחומי ההתמחות | ברזילי, עזורי ושות׳ עורכי דין',
    description:
      'משרד ברזילי, עזורי ושות׳ מתמחה בנדל"ן, התחדשות עירונית, צוואות וירושות, רישום זכויות בטאבו, בתים משותפים וייפוי כוח מתמשך. בחרו את תחום ההתמחות שלכם.',
  },
  {
    urlPath: '/articles',
    module: '/src/pages/Articles.jsx',
    title: 'מאמרים | ברזילי, עזורי ושות׳ עורכי דין',
    description:
      'מאמרים משפטיים בתחומי הנדל"ן, ההתחדשות העירונית, צוואות וירושות וייפוי כוח מתמשך, מאת משרד ברזילי, עזורי ושות׳ עורכי דין.',
  },
  {
    urlPath: '/about',
    module: '/src/pages/About.jsx',
    title: 'אודות המשרד | ברזילי, עזורי ושות׳ עורכי דין',
    description:
      'משרד ברזילי, עזורי ושות׳ עורכי דין בפתח תקווה — שני שותפים, התמחות בנדל"ן, התחדשות עירונית, צוואות, ירושות וייפוי כוח מתמשך.',
  },
  {
    urlPath: '/contact',
    module: '/src/pages/Contact.jsx',
    title: 'צור קשר | ברזילי, עזורי ושות׳ עורכי דין',
    description:
      'צרו קשר עם משרד ברזילי, עזורי ושות׳ עורכי דין: כתובת, טלפון, וואטסאפ, דוא"ל וטופס יצירת קשר לתיאום פגישת ייעוץ.',
  },
  {
    urlPath: '/terms',
    module: '/src/pages/Terms.jsx',
    title: 'תקנון ותנאי שימוש | ברזילי, עזורי ושות׳ עורכי דין',
    description: 'תקנון ותנאי השימוש באתר ברזילי, עזורי ושות׳ עורכי דין.',
  },
  {
    urlPath: '/privacy',
    module: '/src/pages/Privacy.jsx',
    title: 'הצהרת פרטיות | ברזילי, עזורי ושות׳ עורכי דין',
    description:
      'הצהרת הפרטיות של אתר ברזילי, עזורי ושות׳ עורכי דין: איזה מידע נאסף, לאיזו מטרה ואיך הוא מוגן.',
  },
  {
    urlPath: '/accessibility',
    module: '/src/pages/Accessibility.jsx',
    title: 'הצהרת נגישות | ברזילי, עזורי ושות׳ עורכי דין',
    description: 'הצהרת הנגישות של אתר ברזילי, עזורי ושות׳ עורכי דין.',
  },
];

// Detail pages read their slug from useParams(), so they must be rendered
// through a matching <Route path> — rendering the component bare gives it an
// empty params object and it redirects to the listing page instead.
const dynamicRoutes = [
  ...practiceAreas.map((area) => ({
    urlPath: area.canonicalPath,
    routePattern: '/practice-areas/:slug',
    module: '/src/pages/PracticeAreaDetail.jsx',
    title: area.seoTitle,
    description: area.metaDescription,
    jsonLd: buildLegalServiceSchema(area),
  })),
  ...articles.map((article) => ({
    urlPath: article.canonicalPath,
    routePattern: '/articles/:slug',
    module: '/src/pages/ArticleDetail.jsx',
    title: article.seoTitle,
    description: article.metaDescription,
    jsonLd: buildArticleSchema(article),
  })),
  ...attorneys.map((attorney) => ({
    urlPath: `/attorneys/${attorney.slug}`,
    routePattern: '/attorneys/:slug',
    module: '/src/pages/AttorneyDetail.jsx',
    title: attorney.seoTitle,
    description: attorney.metaDescription,
  })),
];

const routes = [...staticRoutes, ...dynamicRoutes];

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// String.replace treats `$&`, `$1` etc. in the replacement as backreferences.
// Page copy is author-controlled, but a stray `$` in a description shouldn't be
// able to corrupt the tag, so every replacement goes through a function.
const replaceOnce = (html, pattern, replacement, label, urlPath) => {
  let matched = false;
  const out = html.replace(pattern, () => {
    matched = true;
    return replacement;
  });
  if (!matched) {
    throw new Error(`prerender: no ${label} found in template for ${urlPath}`);
  }
  return out;
};

for (const route of routes) {
  const { default: Page } = await vite.ssrLoadModule(route.module);
  const html = renderToStaticMarkup(
    React.createElement(
      StaticRouter,
      { location: route.urlPath },
      React.createElement(
        Routes,
        null,
        React.createElement(Route, {
          path: route.routePattern || route.urlPath,
          element: React.createElement(Page),
        })
      )
    )
  );

  if (!html) {
    throw new Error(`prerender: ${route.urlPath} rendered empty — check the route pattern`);
  }

  let page = replaceOnce(
    template,
    '<div id="root"></div>',
    `<div id="root">${html}</div>`,
    '<div id="root"></div>',
    route.urlPath
  );

  const canonical = `${BASE_URL}${route.urlPath}`;
  page = replaceOnce(page, /<link rel="canonical" href=".*?" \/>/s, `<link rel="canonical" href="${canonical}" />`, 'canonical link', route.urlPath);
  page = replaceOnce(page, /<meta property="og:url" content=".*?" \/>/s, `<meta property="og:url" content="${canonical}" />`, 'og:url', route.urlPath);

  if (route.title) {
    const title = escapeAttr(route.title);
    page = replaceOnce(page, /<title>.*?<\/title>/s, `<title>${route.title}</title>`, '<title>', route.urlPath);
    page = replaceOnce(page, /<meta property="og:title" content=".*?" \/>/s, `<meta property="og:title" content="${title}" />`, 'og:title', route.urlPath);
    page = replaceOnce(page, /<meta name="twitter:title" content=".*?" \/>/s, `<meta name="twitter:title" content="${title}" />`, 'twitter:title', route.urlPath);
  }

  if (route.description) {
    const description = escapeAttr(route.description);
    page = replaceOnce(page, /<meta name="description" content=".*?" \/>/s, `<meta name="description" content="${description}" />`, 'description', route.urlPath);
    page = replaceOnce(page, /<meta property="og:description" content=".*?" \/>/s, `<meta property="og:description" content="${description}" />`, 'og:description', route.urlPath);
    page = replaceOnce(page, /<meta name="twitter:description" content=".*?" \/>/s, `<meta name="twitter:description" content="${description}" />`, 'twitter:description', route.urlPath);
  }

  if (route.jsonLd) {
    page = replaceOnce(
      page,
      '</head>',
      `  <script type="application/ld+json">\n${JSON.stringify(route.jsonLd, null, 2)}\n    </script>\n  </head>`,
      '</head>',
      route.urlPath
    );
  }

  const outFile = route.urlPath === '/' ? 'index.html' : `${route.urlPath.slice(1)}/index.html`;
  const outPath = path.join(distDir, outFile);
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, page);
  console.log(`prerender: wrote ${outFile} (${html.length} chars of static content)`);
}

await vite.close();

console.log(`prerender: ${routes.length} routes written`);
