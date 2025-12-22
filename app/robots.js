/**
 * Sam's Hardware Robots.txt Generator
 * 
 * Controls search engine crawling behavior.
 */

export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://samshardware.co.za';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/store/',
          '/api/',
          '/checkout',
          '/cart',
          '/orders/',
          '/payment/',
          '/_next/',
          '/static/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/store/',
          '/api/',
          '/checkout',
          '/cart',
          '/orders/',
          '/payment/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

