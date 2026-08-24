// Prerenders the homepage's real content (Hero, Attorneys, Expertise, Testimonials,
// ContactForm) into dist/index.html's #root so AI crawlers that don't execute JS
// still see meaningful text and an H1. The client bundle still mounts over this
// (createRoot, not hydrateRoot) so visible behavior is unchanged for real users.
import { createServer } from 'vite';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const vite = await createServer({
  root,
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
});

const { default: Home } = await vite.ssrLoadModule('/src/pages/Home.jsx');

const html = renderToStaticMarkup(
  React.createElement(StaticRouter, { location: '/' }, React.createElement(Home))
);

await vite.close();

const distIndexPath = path.join(root, 'dist', 'index.html');
const indexHtml = readFileSync(distIndexPath, 'utf-8');
const injected = indexHtml.replace(
  '<div id="root"></div>',
  `<div id="root">${html}</div>`
);

if (injected === indexHtml) {
  throw new Error('prerender: could not find <div id="root"></div> in dist/index.html');
}

writeFileSync(distIndexPath, injected);
console.log(`prerender: injected ${html.length} chars of static content into dist/index.html`);
