import React from 'react';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { MallorcaTheme } from '@/components/MallorcaTheme';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function PropertyPage({ params }: { params: { slug: string } }) {
  let property = null;
  let siteConfig = null;
  const { slug } = await params; // Next 16 async params handling if needed

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
        image_url: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0430-AVL7R1jyNyFoWb4O.jpeg"
      };
    } else {
      notFound();
    }
  }

  // Inject current property into the child theme component
  return (
    <MallorcaTheme property={property} siteConfig={siteConfig} />
  );
}
