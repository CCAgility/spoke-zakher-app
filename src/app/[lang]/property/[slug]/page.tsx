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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://grupozakher.com';

  return {
    title,
    description,
    alternates: {
      languages: {
        'en': `${siteUrl}/en/property/${slug}`,
        'es': `${siteUrl}/es/property/${slug}`,
      },
    },
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
        fields: ['*', 'gallery.*', 'amenities.amenity_id.*', 'translations.*']
      })
    );
    property = properties?.[0];
  } catch (e: any) {
    console.error("Failed to fetch property:", e);
    // Universally throw upstream errors so Next.js surfaces a Server Error, preventing silent ECONNREFUSED from masking as 404s.
    throw new Error(`Upstream CMS Error: ${e.message}`);
  }

  if (!property) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://grupozakher.com';
  const directusUrl = process.env.DIRECTUS_URL || '';

  // Build JSON-LD VacationRental schema for Google Rich Results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
    name: property.title || 'Casa Estrella de San Pedro',
    description: property.description || '',
    url: `${siteUrl}/${lang}/property/${slug}`,
    ...(property.image_url && {
      image: property.image_url.startsWith('http')
        ? property.image_url
        : `${directusUrl}/assets/${property.image_url}`,
    }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cartagena de Indias',
      addressRegion: 'Bolívar',
      addressCountry: 'CO',
    },
    ...(property.price && {
      priceRange: `From $${property.price} USD/night`,
    }),
    ...(property.bedrooms && { numberOfBedrooms: property.bedrooms }),
    ...(property.max_guests && { occupancy: { '@type': 'QuantitativeValue', maxValue: property.max_guests } }),
  };

  // Inject current property into the child theme component
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MallorcaTheme property={property} siteConfig={siteConfig} lang={lang} />
    </>
  );
}
