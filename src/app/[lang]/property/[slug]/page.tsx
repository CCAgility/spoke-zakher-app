import React from 'react';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { MallorcaTheme } from '@/components/MallorcaTheme';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { resolveTitle, resolveDescription, resolveOgImage } from '@/lib/seo-utils';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string, lang: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let property = null;
  let siteConfig = null;

  try {
    const siteConfigs = await directus.request(readItems('site_config', { limit: 1 }));
    siteConfig = siteConfigs?.[0];
    const properties = await directus.request(
      readItems('properties', { filter: { slug: { _eq: slug } }, limit: 1, fields: ['*'] })
    );
    property = properties?.[0];
  } catch (e) {
    console.error("Failed to fetch for metadata:", e);
  }

  if (!property) return { title: 'Property | Grupo Zakher' };

  const title = resolveTitle(property.seo_title, property.title, siteConfig?.site_title || 'Grupo Zakher');
  const description = resolveDescription(property.seo_description, property.description);
  const ogImage = resolveOgImage(null, siteConfig?.global_og_image, process.env.DIRECTUS_URL);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] })
    }
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string, lang: string }> }) {
  const { slug, lang } = await params;
  let property = null;
  let siteConfig = null;

  try {
    const siteConfigs = await directus.request(readItems('site_config', { limit: 1 }));
    siteConfig = siteConfigs?.[0] || {
      site_title: 'Grupo Zakher',
      site_description: 'Premium property management and luxury real estate listings.'
    };
  } catch (e) {
    console.error("Failed to fetch site_config:", e);
  }

  try {
    const properties = await directus.request(
      readItems('properties', {
        filter: {
          slug: { _eq: slug }
        },
        limit: 1,
        fields: ['*', 'gallery.*', 'amenities.amenity_id.*']
      })
    );
    property = properties?.[0];
  } catch (e) {
    console.error("Failed to fetch property:", e);
  }

  if (!property) {
    // If Directus failed and it's casa-estrella, use fallback for now just to keep demo up
    if (slug === 'casa-estrella') {
      property = {
        title: 'Casa Estrella de San Pedro',
        description: 'A luxurious colonial sanctuary.',
        price: 1500,
        image_url: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0398-m7V3a5Gq50IoWDoN.jpeg"
      };
    } else {
      notFound();
    }
  }

  // Inject current property into the child theme component
  return (
    <MallorcaTheme property={property} siteConfig={siteConfig} lang={lang} />
  );
}
