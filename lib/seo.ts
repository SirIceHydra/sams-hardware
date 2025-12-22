/**
 * Sam's Hardware SEO Utilities
 * 
 * Helper functions for generating SEO-friendly content and metadata.
 */

export const SEO_CONFIG = {
  siteName: "Sam's Hardware",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://samshardware.co.za',
  businessName: "Sam's Hardware",
  businessType: "HardwareStore",
  address: {
    street: "49b Grant Avenue, Norwood",
    city: "Johannesburg",
    province: "Gauteng",
    postalCode: "2192",
    country: "South Africa",
    countryCode: "ZA",
  },
  contact: {
    phone: "+27712492206",
    email: "samshardwareza@gmail.com",
  },
  hours: {
    weekdays: "08:00-20:00",
    sunday: "08:00-15:00",
  },
  location: {
    latitude: -26.1750,
    longitude: 28.0820,
  },
  keywords: {
    primary: [
      "hardware store Norwood",
      "hardware store Johannesburg",
      "hardware store South Africa",
      "Norwood hardware",
      "Johannesburg hardware store",
    ],
    categories: [
      "building materials",
      "electrical supplies",
      "plumbing supplies",
      "paint",
      "power tools",
      "hand tools",
      "lighting",
      "general hardware",
    ],
  },
};

/**
 * Generate page title with location
 */
export function generatePageTitle(pageName: string, includeLocation = true): string {
  const location = includeLocation ? " | Hardware Store Norwood, Johannesburg" : "";
  return `${pageName}${location} | Sam's Hardware`;
}

/**
 * Generate meta description with location context
 */
export function generateDescription(
  content: string,
  includeLocation = true
): string {
  const location = includeLocation
    ? " at Sam's Hardware in Norwood, Johannesburg."
    : ".";
  return `${content}${location} Visit us at ${SEO_CONFIG.address.street}, ${SEO_CONFIG.address.city}.`;
}

/**
 * Generate keywords array for a page
 */
export function generateKeywords(
  pageSpecific: string[],
  includePrimary = true
): string[] {
  const primary = includePrimary ? SEO_CONFIG.keywords.primary : [];
  return [...primary, ...pageSpecific];
}

/**
 * Generate Open Graph image URL
 */
export function generateOGImage(imagePath?: string): string {
  const baseUrl = SEO_CONFIG.siteUrl;
  return imagePath ? `${baseUrl}${imagePath}` : `${baseUrl}/Images/carausel_header/handtools.jpeg`;
}

/**
 * Generate canonical URL
 */
export function generateCanonical(path: string): string {
  const baseUrl = SEO_CONFIG.siteUrl;
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbs(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${SEO_CONFIG.siteUrl}${item.url}`,
    })),
  };
}

