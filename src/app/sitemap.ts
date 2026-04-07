import type { MetadataRoute } from 'next';
import { readItems } from '@directus/sdk';
import directus from '@/lib/directus';

/**
 * Sovereign Dynamic Sitemap
 * 
 * Auto-generates sitemap.xml from all published property slugs.
 * Updates the moment a new property is added in Directus.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  try {
    // Fetch all published property slugs
    const properties = await (directus as any).request(
      (readItems as any)('properties', {
        fields: ['slug', 'date_updated', 'date_created'],
        filter: { status: { _eq: 'published' } },
        limit: -1,
      })
    );

    if (Array.isArray(properties)) {
      for (const property of properties) {
        if (property.slug) {
          routes.push({
            url: `${siteUrl}/properties/${property.slug}`,
            lastModified: property.date_updated || property.date_created || new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
          });
        }
      }
    }
  } catch (error) {
    console.error('[Genesis] Sitemap generation failed:', error);
  }

  return routes;
}
