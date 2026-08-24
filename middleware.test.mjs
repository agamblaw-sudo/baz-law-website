import { describe, it, expect, beforeEach, vi } from 'vitest';
import middleware from './middleware.js';

// Fake static file store the mocked fetch resolves against, mirroring what
// scripts/generate-seo-files.mjs and the 404 pages put in dist/.
const files = {
  '/index.md': '# Home\n\nHome content.\n',
  '/about.md': '# About\n\nAbout content.\n',
  '/404.md': '# 404 — Page not found\n\nSee the sitemap.\n',
};

function mockFetch() {
  return vi.fn(async (input) => {
    const url = typeof input === 'string' ? input : input.href ?? input.url;
    const pathname = new URL(url).pathname;
    if (pathname in files) {
      return new Response(files[pathname], { status: 200 });
    }
    return new Response('not found', { status: 404 });
  });
}

beforeEach(() => {
  global.fetch = mockFetch();
});

describe('middleware content negotiation', () => {
  it('serves the markdown twin with Content-Type and Vary when Accept: text/markdown and the page exists', async () => {
    const req = new Request('https://example.com/about', { headers: { accept: 'text/markdown' } });
    const res = await middleware(req);
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toBe('text/markdown; charset=utf-8');
    expect(res.headers.get('vary')).toBe('Accept, Accept-Encoding');
    expect(await res.text()).toContain('About content.');
  });

  it('maps "/" to /index.md', async () => {
    const req = new Request('https://example.com/', { headers: { accept: 'text/markdown' } });
    const res = await middleware(req);
    expect(await res.text()).toContain('Home content.');
  });

  it('returns a 404 markdown body when the path has no markdown twin', async () => {
    const req = new Request('https://example.com/does-not-exist', { headers: { accept: 'text/markdown' } });
    const res = await middleware(req);
    expect(res.status).toBe(404);
    expect(res.headers.get('content-type')).toBe('text/markdown; charset=utf-8');
    expect(await res.text()).toContain('sitemap');
  });

  it('passes non-markdown requests through with Vary set', async () => {
    const req = new Request('https://example.com/about', { headers: { accept: 'text/html' } });
    const res = await middleware(req);
    expect(res.headers.get('vary')).toBe('Accept, Accept-Encoding');
    expect(res.headers.get('x-middleware-next')).toBe('1');
  });

  it('passes requests with no Accept header through unchanged', async () => {
    const req = new Request('https://example.com/about');
    const res = await middleware(req);
    expect(res.headers.get('x-middleware-next')).toBe('1');
  });
});
