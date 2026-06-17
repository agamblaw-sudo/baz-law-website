import { useEffect } from 'react';

const BASE_URL = 'https://baz-law.co.il';
const DEFAULT_TITLE = "ברזילי, עזורי ושות' | משרד עורכי דין";
const DEFAULT_DESC = 'משרד עורכי דין המתמחה בנדל"ן, התחדשות עירונית, רישום זכויות, צוואות, ירושות וייפוי כוח מתמשך.';
const DEFAULT_CANONICAL = `${BASE_URL}/`;

function setMetaTag(selector, attrKey, attrVal, contentVal) {
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attrKey, attrVal);
    document.head.appendChild(tag);
  }
  tag.content = contentVal;
  return tag;
}

function setCanonical(href) {
  let tag = document.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement('link');
    tag.rel = 'canonical';
    document.head.appendChild(tag);
  }
  tag.href = href;
}

function injectJsonLd(data) {
  removePageSchema();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-page-schema', 'true');
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

function removePageSchema() {
  const existing = document.querySelector('script[data-page-schema]');
  if (existing) existing.remove();
}

/**
 * useSEO — dynamically updates document head for each page.
 * @param {Object} opts
 * @param {string} opts.title        document.title
 * @param {string} opts.description  meta[name="description"]
 * @param {string} opts.keywords     meta[name="keywords"]
 * @param {string} opts.canonicalPath  path appended to BASE_URL for canonical + og:url
 * @param {Object} opts.jsonLd       JSON-LD object (will be stringified and injected)
 */
export function useSEO({ title, description, keywords, canonicalPath, jsonLd } = {}) {
  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.content;
    const prevCanonical = document.querySelector('link[rel="canonical"]')?.href;

    if (title) document.title = title;
    if (description) setMetaTag('meta[name="description"]', 'name', 'description', description);
    if (keywords) setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);

    const fullUrl = canonicalPath ? `${BASE_URL}${canonicalPath}` : null;
    if (fullUrl) {
      setCanonical(fullUrl);
      setMetaTag('meta[property="og:url"]', 'property', 'og:url', fullUrl);
    }

    if (title) setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    if (description) setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);

    if (jsonLd) injectJsonLd(jsonLd);

    return () => {
      document.title = prevTitle || DEFAULT_TITLE;
      if (prevDesc) setMetaTag('meta[name="description"]', 'name', 'description', prevDesc);
      if (prevCanonical) setCanonical(prevCanonical);
      else setCanonical(DEFAULT_CANONICAL);
      setMetaTag('meta[property="og:title"]', 'property', 'og:title', DEFAULT_TITLE);
      setMetaTag('meta[property="og:description"]', 'property', 'og:description', DEFAULT_DESC);
      removePageSchema();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, keywords, canonicalPath]);
}
