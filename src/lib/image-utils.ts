/**
 * Centralized Directus Asset URL Resolver
 * 
 * Eliminates hardcoded CMS URLs scattered across components.
 * Resolves images from the DIRECTUS_URL env var at runtime, 
 * falling back to the production Cloud Run address if unset.
 * 
 * @module image-utils
 */

const CMS_BASE_URL = process.env.DIRECTUS_URL 
  || process.env.CMS_URL 
  || 'https://directus-cms-159885988938.us-central1.run.app';

/**
 * Build a full Directus asset URL from a file UUID.
 * Returns null if no fileId is provided.
 */
export function directusAssetUrl(fileId: string | null | undefined): string | null {
  if (!fileId) return null;
  // If it's already a full URL, return as-is
  if (fileId.startsWith('http://') || fileId.startsWith('https://')) return fileId;
  return `${CMS_BASE_URL}/assets/${fileId}`;
}

/**
 * Resolve a property hero image with graceful fallback chain:
 *   1. property.image_url (explicit external URL)
 *   2. property.hero_image (Directus file UUID → resolved URL)
 *   3. localFallback (static /public asset)
 */
export function resolveHeroImage(
  property: { image_url?: string; hero_image?: string } | null | undefined,
  localFallback: string = '/gallery/casa-estrella/1.webp'
): string {
  if (property?.image_url) return property.image_url;
  const directusUrl = directusAssetUrl(property?.hero_image);
  if (directusUrl) return directusUrl;
  return localFallback;
}

/**
 * Resolve a gallery item's image URL.
 * Gallery items from Directus have a `directus_files_id` field.
 */
export function resolveGalleryImage(
  item: { directus_files_id?: string } | number,
  index: number
): string {
  if (typeof item === 'object' && item?.directus_files_id) {
    return directusAssetUrl(item.directus_files_id) || `/gallery/casa-estrella/${index + 1}.webp`;
  }
  return `/gallery/casa-estrella/${index + 1}.webp`;
}
