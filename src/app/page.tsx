import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

// CMS Singleton and SDK methods
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

export default async function Home() {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID || 'zakher';

  // Fetch the Sovereign Spoke content
  const pages = await directus.request(
    readItems('pages', {
      filter: {
        tenant_id: { _eq: tenantId },
        slug: { _eq: '/' }
      },
      limit: 1
    })
  );

  // Fallbacks if CMS data is missing (Wait for Veneer to complete)
  const content = pages && pages.length > 0 ? pages[0] : {
    hero_title: "Casa Estrella de San Pedro",
    hero_subtext: "A seven-bedroom colonial sanctuary where historic elegance meets tropical tranquility.",
    cta_text: "Discover the Villa"
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-swimming-pool-in-a-luxury-villa-4181-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-6 mt-16">
          <h2 className="text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-6">Cartagena, Colombia</h2>
          <h1 className="font-serif text-5xl md:text-8xl mb-8 leading-tight drop-shadow-lg">
            {content.hero_title}
          </h1>
          <p className="text-lg md:text-xl font-light max-w-2xl mx-auto drop-shadow-md mb-8">
            {content.hero_subtext}
          </p>
          <Link 
            href="/the-villa" 
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
          >
            {content.cta_text} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <div>
          <h2 className="font-serif text-3xl md:text-5xl mb-8 text-gray-900 leading-tight">
            The crown jewel of the Zakher portfolio.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed font-light">
            Casa Estrella de San Pedro offers an uncompromising blend of colonial grandeur and modern luxury. As our exclusive flagship property, every detail of this seven-bedroom sanctuary is managed with singular focus to provide the ultimate retreat in Cartagena.
          </p>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/the-villa" className="group relative h-[60vh] overflow-hidden bg-gray-100">
            <img 
              src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0644-m5KM1LpyNxsxzl9b.jpeg" 
              alt="Architecture" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="font-serif text-3xl mb-2">The Architecture</h3>
              <span className="text-sm font-medium tracking-widest uppercase flex items-center gap-2">
                Explore <ArrowRight size={14} />
              </span>
            </div>
          </Link>
          
          <Link href="/amenities" className="group relative h-[60vh] overflow-hidden bg-gray-100">
            <img 
              src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0389-mp8WRqw9M5T49WDb.jpeg" 
              alt="Amenities" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="font-serif text-3xl mb-2">Resort Amenities</h3>
              <span className="text-sm font-medium tracking-widest uppercase flex items-center gap-2">
                Discover <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}