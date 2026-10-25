import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../config/siteConfig';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
}

export function SEOHead({ title, description, canonicalPath }: SEOHeadProps) {
  const location = useLocation();
  const fullTitle = `${title} | ${SITE_CONFIG.brand.name}`;
  const path = canonicalPath || location.pathname;
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : SITE_CONFIG.brand.productionDomain;
  const canonicalUrl = `${origin.replace(/\/$/, '')}${path}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (selector: string, attrName: string, attrValue: string, content: string) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    let canonicalEl = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonicalUrl);
  }, [fullTitle, description, canonicalUrl]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_CONFIG.brand.name,
    description: SITE_CONFIG.brand.tagline,
    url: canonicalUrl,
    email: SITE_CONFIG.brand.primaryEmail,
    telephone: SITE_CONFIG.brand.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.brand.address,
      addressCountry: 'IN',
    },
    openingHours: SITE_CONFIG.brand.workingHours,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
