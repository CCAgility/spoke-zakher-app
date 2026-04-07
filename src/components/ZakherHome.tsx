'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, ChevronRight, MapPin, Check } from 'lucide-react';
import Link from 'next/link';

export function ZakherHome({ 
  siteConfig, 
  properties,
  lang
}: { 
  siteConfig: any; 
  properties: any[];
  lang?: string;
}) {
  const [showSticky, setShowSticky] = useState(false);
  const [langState, setLang] = useState(lang || 'en');

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const amenitiesList = [
    "Air conditioning", "WiFi",
    "Private pool", "Daily housekeeping",
    "Concierge", "Breakfast included",
    "Fully equipped kitchen", "Smart TV"
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#1A1A1A] font-sans selection:bg-[#8BA3A0] selection:text-white">
      {/* Custom Fonts */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@200;300;400;500&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
      `}} />

      {/* Header */}
      <header className="fixed top-0 w-full px-6 py-8 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white drop-shadow-md">
        <div className="flex items-center gap-4">
          <div className="font-montserrat text-sm tracking-[0.3em] uppercase font-light text-white">
            {siteConfig?.site_title || "Grupo Zakher"}
          </div>
        </div>
        <nav className="hidden md:flex gap-10 font-montserrat text-xs tracking-[0.2em] uppercase text-white">
          <Link href={`/${langState}`} className="hover:opacity-70 transition-opacity">Home</Link>
          
          <div className="relative group">
            <button className="hover:opacity-70 transition-opacity flex items-center gap-2">
              Property <span className="text-[8px] opacity-70">▼</span>
            </button>
            <div className="absolute top-full left-0 mt-2 bg-black/95 backdrop-blur-md border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[220px] shadow-2xl py-2">
              <Link href={`/${langState}/property/casa-estrella`} className="block px-6 py-4 text-[10px] tracking-widest hover:bg-white/10 transition-colors text-white/90 hover:text-white">
                Casa Estrella
              </Link>
            </div>
          </div>

          <button className="hover:opacity-70 transition-opacity">Amenities</button>
          <button className="hover:opacity-70 transition-opacity">Gallery</button>
          <button className="hover:opacity-70 transition-opacity">Contact</button>
        </nav>
        <button className="border border-white/60 hover:bg-white hover:text-black px-8 py-3 font-montserrat text-xs tracking-[0.2em] uppercase transition-all duration-300 text-white">
          Reserve
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative h-[100vh] w-full overflow-hidden flex flex-col justify-end pb-32 px-8 md:px-16">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src={siteConfig?.hero_image || "/parent-hero.jpg"}
            alt={siteConfig?.site_title || "Grupo Zakher Night Skyline"}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>

        <div className="relative z-10 text-white max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6 font-montserrat text-xs tracking-[0.2em] uppercase text-white/80">
              <MapPin size={14} />
              <span>Cartagena, Colombia</span>
            </div>
            <h1 className="font-cormorant text-6xl md:text-8xl lg:text-9xl font-light leading-none mb-6 drop-shadow-lg">
              {siteConfig?.site_title || "Grupo Zakher"}
            </h1>
            <p className="font-montserrat text-sm md:text-base font-light max-w-xl leading-relaxed text-white/90 drop-shadow-md">
              {siteConfig?.site_description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Widget */}
      <div className="relative z-20 -mt-16 max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="bg-white shadow-2xl p-2 flex flex-col md:flex-row items-center"
        >
          <div className="flex-1 flex items-center gap-4 px-8 py-4 border-b md:border-b-0 md:border-r border-gray-100 w-full">
            <div className="flex flex-col text-left">
              <span className="font-montserrat text-[10px] text-gray-400 uppercase tracking-widest mb-1">Check-in - Check-out</span>
              <span className="font-cormorant text-xl text-gray-800">Select dates</span>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-4 px-8 py-4 border-b md:border-b-0 md:border-r border-gray-100 w-full">
            <div className="flex flex-col text-left">
              <span className="font-montserrat text-[10px] text-gray-400 uppercase tracking-widest mb-1">Guests</span>
              <span className="font-cormorant text-xl text-gray-800">2 Adults</span>
            </div>
          </div>
          <div className="px-4 py-4 w-full md:w-auto">
            <button className="w-full bg-[#1A1A1A] text-white px-10 py-4 font-montserrat text-xs tracking-[0.2em] uppercase hover:bg-[#333] transition-colors">
              Check Availability
            </button>
          </div>
        </motion.div>
      </div>

      {/* About & Amenities */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="mb-16">
          <h2 className="font-cormorant text-4xl md:text-5xl text-[#1A1A1A] mb-8 font-medium">About the home</h2>
          <p className="font-montserrat text-gray-600 leading-relaxed text-lg md:text-xl font-light">
            Discover a sanctuary where history and luxury intertwine. Our properties offer exquisite accommodations, private pools, and lush courtyards, providing an unparalleled retreat in Cartagena. Every detail has been carefully curated to ensure your stay is nothing short of extraordinary.
          </p>
        </div>

        <div className="w-full h-px bg-gray-200 mb-16"></div>

        <div>
          <h2 className="font-cormorant text-4xl md:text-5xl text-[#1A1A1A] mb-10 font-medium">Amenities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-12">
            {amenitiesList.map((amenity, index) => (
              <div key={index} className="flex items-center gap-4">
                <Check size={20} className="text-gray-400" strokeWidth={1.5} />
                <span className="font-montserrat text-gray-700 font-light text-base md:text-lg">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid - Sovereign Property Loop */}
      <section className="py-16 px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {properties?.map((prop, i) => (
            <div key={i} className="group relative h-[600px] overflow-hidden">
              <img 
                src={prop.image_url} 
                alt={prop.title} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <span className="font-montserrat text-xs tracking-[0.3em] uppercase mb-4">{prop.price ? `$${prop.price} / Night` : 'Contact for Price'}</span>
                <h3 className="font-cormorant text-4xl font-light mb-8 text-center px-4">{prop.title}</h3>
                <Link href={`/property/${prop.slug}`}>
                  <button className="border border-white px-8 py-3 font-montserrat text-[10px] tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-300">
                    Explore
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111] text-white py-20 px-6 text-center">
        <div className="font-montserrat text-sm tracking-[0.3em] uppercase font-light mb-8">
          {siteConfig?.site_title || "Grupo Zakher"}
        </div>
        <p className="font-montserrat text-[10px] tracking-widest text-gray-500 uppercase">
          &copy; {new Date().getFullYear()} {siteConfig?.site_title || "Grupo Zakher"}. All rights reserved.
        </p>
      </footer>

      {/* Sticky Floating Booking Bar */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl bg-white/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-full border border-white/60 p-2 flex items-center justify-between"
          >
            <div className="hidden md:flex items-center gap-10 px-8">
              <div className="flex flex-col text-left">
                <span className="font-montserrat text-[9px] text-gray-500 uppercase tracking-widest mb-0.5">Check-in - Check-out</span>
                <span className="font-cormorant text-xl text-gray-900 leading-none">Select dates</span>
              </div>
              <div className="w-[1px] h-8 bg-gray-300"></div>
              <div className="flex flex-col text-left">
                <span className="font-montserrat text-[9px] text-gray-500 uppercase tracking-widest mb-0.5">Guests</span>
                <span className="font-cormorant text-xl text-gray-900 leading-none">2 Adults</span>
              </div>
            </div>
            <div className="flex-1 md:hidden px-6 text-left">
              <span className="font-cormorant text-xl text-gray-900 leading-none">{siteConfig?.site_title || "Grupo Zakher"}</span>
            </div>
            <button className="bg-[#1A1A1A] text-white px-8 py-4 rounded-full font-montserrat text-[10px] tracking-[0.2em] uppercase hover:bg-[#333] transition-colors whitespace-nowrap">
              Check Availability
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
