import React, { useEffect } from 'react';
import { Page } from '../types';
import { useCms } from '../context/CmsContext';

interface DynamicJsonLdProps {
  currentPage: Page | 'cms';
  siteTitle?: string;
}

export const DynamicJsonLd: React.FC<DynamicJsonLdProps> = ({ currentPage, siteTitle = 'Webiknows IT Solutions' }) => {
  const cms = useCms();

  useEffect(() => {
    if (currentPage === 'cms') return;

    const seo = cms.pageSeoSettings?.[currentPage as Page];
    const title = seo?.seoTitle || siteTitle;
    const description = seo?.metaDescription || '';
    const ogTitle = seo?.ogTitle || title;
    const ogDescription = seo?.ogDescription || description;
    const ogImage = seo?.ogImage || '';
    const keywords = seo?.keywords || '';

    // Update Document Title
    document.title = title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update Meta Keywords
    if (keywords) {
      let metaKw = document.querySelector('meta[name="keywords"]');
      if (!metaKw) {
        metaKw = document.createElement('meta');
        metaKw.setAttribute('name', 'keywords');
        document.head.appendChild(metaKw);
      }
      metaKw.setAttribute('content', keywords);
    }

    // Update OpenGraph Tags
    const updateOgTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOgTag('og:title', ogTitle);
    updateOgTag('og:description', ogDescription);
    if (ogImage) updateOgTag('og:image', ogImage);
    updateOgTag('og:url', window.location.href);
    updateOgTag('og:type', 'website');

    // Update Twitter Card Tags
    const updateTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateTwitterTag('twitter:card', 'summary_large_image');
    updateTwitterTag('twitter:title', ogTitle);
    updateTwitterTag('twitter:description', ogDescription);
    if (ogImage) updateTwitterTag('twitter:image', ogImage);

    const origin = window.location.origin;
    
    // Base Organization Schema shared across pages
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Webiknows IT Solutions Pvt. Ltd.",
      "alternateName": "WebiKnows",
      "url": origin,
      "logo": `${origin}/logo.png`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-800-WEB-IKNOWS",
        "contactType": "customer service",
        "email": "contact@webiknows.com",
        "areaServed": "Global",
        "availableLanguage": ["English"]
      },
      "sameAs": [
        "https://twitter.com/webiknows",
        "https://linkedin.com/company/webiknows",
        "https://github.com/webiknows"
      ]
    };

    let pageSpecificSchema: any = {};

    switch (currentPage) {
      case 'home':
        pageSpecificSchema = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": title,
          "url": origin,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${origin}/#search={search_term_string}`,
            "query-input": "required name=search_term_string"
          },
          "description": description
        };
        break;

      case 'about':
        pageSpecificSchema = {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": title,
          "description": description,
          "mainEntity": {
            "@type": "Organization",
            "name": "Webiknows IT Solutions",
            "foundingDate": "2020",
            "knowsAbout": ["Figma-First Engineering", "Custom CRM Development", "SaaS Platforms", "Mobile Apps", "Cloud Infrastructure"]
          }
        };
        break;

      case 'services':
        pageSpecificSchema = {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": title,
          "description": description,
          "itemListElement": [
            {
              "@type": "Service",
              "position": 1,
              "name": "Custom CRM Development",
              "description": "Tailored customer relationship management systems with automated pipelines and real-time analytics."
            },
            {
              "@type": "Service",
              "position": 2,
              "name": "SaaS Platform Engineering",
              "description": "Scalable multi-tenant cloud applications built with high performance and modern stacks."
            },
            {
              "@type": "Service",
              "position": 3,
              "name": "Figma-First UI/UX Design Systems",
              "description": "Pixel-perfect design tokens, component libraries, and interactive prototypes."
            },
            {
              "@type": "Service",
              "position": 4,
              "name": "Mobile App Development",
              "description": "Cross-platform iOS and Android apps with native performance and responsive layouts."
            }
          ]
        };
        break;

      case 'casestudies':
        pageSpecificSchema = {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": title,
          "description": description
        };
        break;

      case 'team':
        pageSpecificSchema = {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": title,
          "description": description
        };
        break;

      case 'blogs':
        pageSpecificSchema = {
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": title,
          "description": description
        };
        break;

      case 'contact':
        pageSpecificSchema = {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": title,
          "description": description,
          "mainEntity": {
            "@type": "LocalBusiness",
            "name": "Webiknows IT Solutions",
            "telephone": "+1-800-WEB-IKNOWS",
            "email": "contact@webiknows.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Tech Park Avenue",
              "addressLocality": "San Francisco",
              "addressRegion": "CA",
              "postalCode": "94107",
              "addressCountry": "US"
            }
          }
        };
        break;

      default:
        pageSpecificSchema = {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": title,
          "description": description
        };
    }

    const schemas = [organizationSchema, pageSpecificSchema];

    // Remove existing dynamic json-ld script tags
    const existingScripts = document.querySelectorAll('script[data-dynamic-json-ld="true"]');
    existingScripts.forEach(script => script.remove());

    // Inject new script tag
    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.setAttribute('data-dynamic-json-ld', 'true');
    scriptTag.text = JSON.stringify(schemas, null, 2);
    document.head.appendChild(scriptTag);

    return () => {
      const scripts = document.querySelectorAll('script[data-dynamic-json-ld="true"]');
      scripts.forEach(s => s.remove());
    };
  }, [currentPage, siteTitle, cms.pageSeoSettings]);

  return null;
};
