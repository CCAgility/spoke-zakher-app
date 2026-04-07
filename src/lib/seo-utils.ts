/**
 * Sovereign SEO Fortress — "Hierarchy of Truth" Utility
 * 
 * Every page in the Spoke uses this module to resolve metadata.
 * If the user (e.g., Grupo Zakher) is lazy and leaves fields empty,
 * the system auto-generates professional SEO from existing data.
 */

// ── Title Resolution ──
// Priority: seo_title → "{property_title} | {site_name}" → site_name → fallback
export function resolveTitle(
  seoTitle?: string | null,
  propertyTitle?: string | null,
  siteName?: string | null
): string {
  if (seoTitle?.trim()) return seoTitle.trim();
  const name = siteName?.trim() || 'Property Portfolio';
  if (propertyTitle?.trim()) return `${propertyTitle.trim()} | ${name}`;
  return name;
}

// ── Description Resolution ──
// Priority: seo_description → first 160 chars of HTML-stripped description → fallback
export function resolveDescription(
  seoDescription?: string | null,
  htmlDescription?: string | null
): string {
  if (seoDescription?.trim()) return seoDescription.trim();
  if (htmlDescription) {
    const stripped = htmlDescription
      .replace(/<[^>]*>/g, '')   // Strip HTML tags
      .replace(/&nbsp;/g, ' ')   // Replace HTML entities
      .replace(/\s+/g, ' ')      // Normalize whitespace
      .trim();
    if (stripped.length > 0) {
      return stripped.length > 160 ? stripped.substring(0, 157) + '...' : stripped;
    }
  }
  return 'Premium property listing managed by Agility Architecture.';
}

// ── OG Image Resolution ──
// Priority: property gallery[0] → global_og_image → null
export function resolveOgImage(
  gallery?: any[] | null,
  globalOgImage?: string | null,
  cmsUrl?: string | null
): string | null {
  const baseUrl = cmsUrl || process.env.CMS_URL || process.env.DIRECTUS_URL || '';
  
  // Try property's first gallery image
  const firstImage = gallery?.[0]?.directus_files_id;
  if (firstImage) {
    const imageId = typeof firstImage === 'string' ? firstImage : firstImage?.id;
    if (imageId) return `${baseUrl}/assets/${imageId}`;
  }
  
  // Try global OG image from site_config
  if (globalOgImage) {
    const imageId = typeof globalOgImage === 'string' ? globalOgImage : (globalOgImage as any)?.id;
    if (imageId) return `${baseUrl}/assets/${imageId}`;
  }
  
  return null;
}

// ── Alt-Text Generation ──
// If an image lacks a description in Directus, auto-generate one
export function generateAltText(
  image: any,
  propertyTitle?: string | null,
  propertyLocation?: string | null,
  index?: number
): string {
  // Use the Directus file description/title if available
  if (image?.description?.trim()) return image.description.trim();
  if (image?.title?.trim()) return image.title.trim();
  
  // Auto-generate from property context
  const position = index !== undefined ? ` ${index + 1}` : '';
  const location = propertyLocation ? ` in ${propertyLocation}` : '';
  const title = propertyTitle || 'Property';
  return `View${position} of ${title}${location}`;
}

// ── JSON-LD Structured Data Builder ──
// Generates RealEstateListing schema for Google Rich Snippets
export function buildJsonLd(
  property: {
    title?: string;
    description?: string;
    price?: number | string;
    bedrooms?: number;
    bathrooms?: number;
    slug?: string;
    gallery?: any[];
    location?: string;
  },
  siteConfig: {
    site_title?: string;
    site_description?: string;
  },
  cmsUrl?: string,
  siteUrl?: string
): Record<string, any> {
  const baseUrl = cmsUrl || process.env.CMS_URL || process.env.DIRECTUS_URL || '';
  const productionUrl = siteUrl || process.env.NEXT_PUBLIC_SITE_URL || '';
  
  const imageUrl = resolveOgImage(property.gallery, null, cmsUrl);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title || 'Property Listing',
    description: resolveDescription(null, property.description),
    url: property.slug ? `${productionUrl}/properties/${property.slug}` : productionUrl,
    ...(property.price && {
      offers: {
        '@type': 'Offer',
        price: Number(property.price),
        priceCurrency: 'USD',
      },
    }),
    ...(property.bedrooms && { numberOfRooms: property.bedrooms }),
    ...(property.bathrooms && { numberOfBathroomsTotal: property.bathrooms }),
    ...(imageUrl && { image: imageUrl }),
    ...(property.location && {
      address: {
        '@type': 'PostalAddress',
        addressLocality: property.location,
      },
    }),
    ...(siteConfig.site_title && {
      provider: {
        '@type': 'Organization',
        name: siteConfig.site_title,
      },
    }),
  };
}
