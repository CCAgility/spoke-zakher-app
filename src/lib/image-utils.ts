/**
 * Centralized Directus Asset URL Resolver
 * 
 * Eliminates hardcoded CMS URLs scattered across components.
 * Sources the canonical CMS base URL from the directus.ts
 * singleton — the single source of truth for CMS connectivity.
 * 
 * @module image-utils
 */

import { DIRECTUS_URL } from './directus';

/**
 * Build a full Directus asset URL from a file UUID.
 * Returns null if no fileId is provided.
 */
export function directusAssetUrl(fileId: string | null | undefined): string | null {
  if (!fileId) return null;
  // If it's already a full URL, return as-is
  if (fileId.startsWith('http://') || fileId.startsWith('https://')) return fileId;
  return `${DIRECTUS_URL}/assets/${fileId}`;
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
