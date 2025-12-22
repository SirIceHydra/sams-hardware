/**
 * Sam's Hardware Sitemap Generator
 * 
 * Generates a dynamic sitemap for all pages and products.
 */

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://samshardware.co.za';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shipping`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Department pages (from Footer or constants)
  const departments = [
    'building-materials',
    'electrical',
    'general-hardware',
    'handtools',
    'lighting',
    'paint',
    'plumbing',
    'powertools',
  ];

  const departmentPages = departments.map((dept) => ({
    url: `${baseUrl}/department/${dept}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Try to fetch products from API
  let productPages = [];
  try {
    const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL;
    if (apiUrl) {
      const response = await fetch(`${apiUrl}/wp-json/sams-hardware/v1/products?per_page=100`, {
        next: { revalidate: 3600 } // Revalidate every hour
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.products && Array.isArray(data.products)) {
          productPages = data.products.map((product) => ({
            url: `${baseUrl}/product/${product.id}`,
            lastModified: product.modified || new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
          }));
        }
      }
    }
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
    // Continue without product pages if API fails
  }

  return [...staticPages, ...departmentPages, ...productPages];
}

