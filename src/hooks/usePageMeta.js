import { useEffect } from 'react';

const MANAGED_ATTR = 'data-use-page-meta';
const SITE_NAME = 'Hornbill Journeys';

const getCurrentUrl = () => `${window.location.origin}${window.location.pathname}`;

const getOrCreateNode = (selector, tagName = 'meta') => {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement(tagName);
    node.setAttribute(MANAGED_ATTR, 'true');
    const match = selector.match(/\[(name|property|rel)="([^"]+)"\]/);
    if (match) node.setAttribute(match[1], match[2]);
    document.head.appendChild(node);
  } else {
    node.setAttribute(MANAGED_ATTR, 'true');
  }
  return node;
};

const setMeta = (selector, attr, value) => {
  const node = document.head.querySelector(selector);
  if (!value) {
    if (node?.getAttribute(MANAGED_ATTR) === 'true') node.remove();
    return;
  }
  getOrCreateNode(selector).setAttribute(attr, value);
};

const setLink = (rel, href) => {
  const selector = `link[rel="${rel}"]`;
  const node = document.head.querySelector(selector);
  if (!href) {
    if (node?.getAttribute(MANAGED_ATTR) === 'true') node.remove();
    return;
  }
  const link = getOrCreateNode(selector, 'link');
  link.setAttribute('rel', rel);
  link.setAttribute('href', href);
};

const setStructuredData = (schema) => {
  const selector = 'script[data-use-page-meta="schema"]';
  const existing = document.head.querySelector(selector);
  if (!schema) {
    if (existing) existing.remove();
    return;
  }
  const script = existing || document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute(MANAGED_ATTR, 'true');
  script.setAttribute('data-use-page-meta', 'schema');
  script.textContent = JSON.stringify(schema);
  if (!existing) document.head.appendChild(script);
};

export function usePageMeta({ title, description, image, canonical, type = 'website', noIndex = false, schema }) {
  useEffect(() => {
    if (title) document.title = title;

    const currentUrl = typeof window !== 'undefined' ? getCurrentUrl() : '';
    const resolvedCanonical = canonical || currentUrl;
    const cardType = image ? 'summary_large_image' : 'summary';

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[name="robots"]', 'content', noIndex ? 'noindex,follow' : 'index,follow');
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:image"]', 'content', image);
    setMeta('meta[property="og:url"]', 'content', resolvedCanonical);
    setMeta('meta[property="og:type"]', 'content', type);
    setMeta('meta[property="og:site_name"]', 'content', SITE_NAME);
    setMeta('meta[name="twitter:card"]', 'content', cardType);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', image);
    setLink('canonical', resolvedCanonical);
    setStructuredData(schema);
  }, [title, description, image, canonical, type, noIndex, schema]);
}
