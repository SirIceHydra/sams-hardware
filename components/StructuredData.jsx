/**
 * Sam's Hardware Structured Data Component
 * 
 * Provides JSON-LD structured data for SEO, including LocalBusiness schema.
 */

'use client';

import { useEffect } from 'react';

const BUSINESS_DATA = {
  "@context": "https://schema.org",
  "@type": "HardwareStore",
  "name": "Sam's Hardware",
  "image": "/logo.svg",
  "description": "Sam's Hardware is the premier hardware store in Norwood, Johannesburg, offering professional tools, building materials, electrical supplies, plumbing, paint, and more.",
  "url": process.env.NEXT_PUBLIC_SITE_URL || "https://samshardware.co.za",
  "telephone": "+27712492206",
  "email": "samshardwareza@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "49b Grant Avenue, Norwood",
    "addressLocality": "Norwood",
    "addressRegion": "Gauteng",
    "postalCode": "2192",
    "addressCountry": "ZA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -26.1750, // Approximate coordinates for Norwood, Johannesburg
    "longitude": 28.0820
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "08:00",
      "closes": "15:00"
    }
  ],
  "priceRange": "$$",
  "paymentAccepted": "Cash, Credit Card, EFT",
  "currenciesAccepted": "ZAR",
  "areaServed": {
    "@type": "City",
    "name": "Johannesburg"
  },
  "sameAs": [
    "https://www.facebook.com",
    "https://www.instagram.com",
    "https://twitter.com",
    "https://www.linkedin.com"
  ]
};

const ORGANIZATION_DATA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Sam's Hardware",
  "url": process.env.NEXT_PUBLIC_SITE_URL || "https://samshardware.co.za",
  "logo": "/logo.svg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+27712492206",
    "contactType": "Customer Service",
    "email": "samshardwareza@gmail.com",
    "areaServed": "ZA",
    "availableLanguage": "en"
  },
  "sameAs": [
    "https://www.facebook.com",
    "https://www.instagram.com",
    "https://twitter.com",
    "https://www.linkedin.com"
  ]
};

export function StructuredData({ type = 'business', product = null }) {
  useEffect(() => {
    // Remove existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => {
      if (script.id?.startsWith('structured-data-')) {
        script.remove();
      }
    });

    // Add business/organization structured data
    if (type === 'business' || type === 'organization') {
      const data = type === 'business' ? BUSINESS_DATA : ORGANIZATION_DATA;
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `structured-data-${type}`;
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    }

    // Add product structured data if provided
    if (product && type === 'product') {
      const productData = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description || product.shortDescription || `${product.name} available at Sam's Hardware`,
        "image": product.image || product.images?.[0] || "/Images/Departments/General hardware.jpeg",
        "brand": {
          "@type": "Brand",
          "name": product.brand || "Sam's Hardware"
        },
        "offers": {
          "@type": "Offer",
          "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://samshardware.co.za'}/product/${product.id}`,
          "priceCurrency": "ZAR",
          "price": product.salePrice || product.price || product.regularPrice,
          "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          "itemCondition": "https://schema.org/NewCondition",
          "availability": product.stockStatus === 'instock' || product.inStock 
            ? "https://schema.org/InStock" 
            : "https://schema.org/OutOfStock",
          "seller": {
            "@type": "Organization",
            "name": "Sam's Hardware"
          }
        },
        "aggregateRating": product.rating ? {
          "@type": "AggregateRating",
          "ratingValue": product.rating,
          "reviewCount": product.reviewCount || 1
        } : undefined
      };

      // Remove undefined fields
      Object.keys(productData).forEach(key => {
        if (productData[key] === undefined) {
          delete productData[key];
        }
      });

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'structured-data-product';
      script.text = JSON.stringify(productData);
      document.head.appendChild(script);
    }

    // Add breadcrumb structured data for product pages
    if (product && type === 'product') {
      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": process.env.NEXT_PUBLIC_SITE_URL || "https://samshardware.co.za"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Shop",
            "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://samshardware.co.za'}/shop`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": product.name,
            "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://samshardware.co.za'}/product/${product.id}`
          }
        ]
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'structured-data-breadcrumb';
      script.text = JSON.stringify(breadcrumbData);
      document.head.appendChild(script);
    }
  }, [type, product]);

  return null;
}

