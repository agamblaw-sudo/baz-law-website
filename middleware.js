// Vercel Edge Middleware: serves the Markdown twin of a page when the client
// asks for it via `Accept: text/markdown` (acceptmarkdown.com content negotiation).
// The .md twins are generated at build time by scripts/generate-seo-files.mjs.
import { next } from '@vercel/edge';

export const config = {
  matcher: '/((?!assets/|sitemap\\.xml|robots\\.txt|llms\\.txt|.*\\..*).*)',
};

export default async function middleware(request) {
  const accept = request.headers.get('accept') || '';
  const wantsMarkdown = accept.includes('text/markdown');

  if (!wantsMarkdown) {
    return next({ headers: { Vary: 'Accept, Accept-Encoding' } });
  }

  const url = new URL(request.url);
  const mdPath = url.pathname === '/' ? '/index.md' : `${url.pathname}.md`;
  const mdResponse = await fetch(new URL(mdPath, url));

  if (!mdResponse.ok) {
    return next({ headers: { Vary: 'Accept, Accept-Encoding' } });
  }

  return new Response(mdResponse.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept, Accept-Encoding',
    },
  });
}
