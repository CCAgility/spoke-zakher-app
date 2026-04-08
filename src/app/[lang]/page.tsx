import React from 'react';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { ZakherHome } from '@/components/ZakherHome';

export const dynamic = 'force-dynamic';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  // Fetch the Sovereign Spoke content
  const { lang } = await params;
  
  let siteConfig = null;
  let property = null;

  try {
    const siteConfigs = await directus.request(readItems('site_config', { limit: 1 }));
    siteConfig = siteConfigs?.[0] || {
      site_title: 'Grupo Zakher',
      site_description: 'Premium property management and luxury real estate listings.'
    };
  } catch (e) {
    console.error("Failed to fetch site_config:", e);
  }

  let properties = [];

  try {
    const response = await directus.request(
      readItems('properties', { 
        limit: 10,
        fields: ['*', 'gallery.*', 'amenities.amenity_id.*']
      })
    );
    properties = response || [];
    if (properties.length === 0) throw new Error("Empty properties array from Directus.");
  } catch (e) {
    console.error("Failed to fetch properties:", e);
    // Fallback if empty
    properties = [{
      title: 'Casa Estrella de San Pedro',
      slug: 'casa-estrella',
      description: 'A luxurious colonial sanctuary.',
      price: 1500,
      image_url: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0398-m7V3a5Gq50IoWDoN.jpeg"
    }];
  }

  return (
    <ZakherHome siteConfig={siteConfig} properties={properties} lang={lang} />
  );
}