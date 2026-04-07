'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, ChevronRight, MapPin, Anchor, Wind, Sun, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const translations = {
  en: {
    nav: { home: "Home", casaEstrella: "Casa Estrella de San Pedro", villa: "The Villa", accommodations: "Accommodations", gallery: "Gallery", contact: "Contact" },
    bookNow: "Reserve",
    location: "Cartagena, Colombia",
    heroTitle: "A Haven of Peace",
    heroSubtitle: "Experience the timeless elegance of our colonial villa, nestled in the heart of the historic walled city.",
    arrival: "Check-in",
    departure: "Check-out",
    dates: "Select dates",
    guests: "Guests",
    adults: "2 Adults",
    search: "Check Availability",
    welcomeTitle: "Welcome to Casa Estrella de San Pedro",
    welcomeText: "Discover a sanctuary where history and luxury intertwine. Casa Estrella offers seven exquisite bedrooms, private pools, and lush courtyards, providing an unparalleled retreat in Cartagena. Every detail has been carefully curated to ensure your stay is nothing short of extraordinary.",
    aboutTitle: "About the home",
    amenitiesTitle: "Amenities",
    amenitiesList: [
      "Pool & Mini Pool",
      "Rooftop Bar",
      "Outdoor Dining table",
      "Security 6 PM - 7 AM",
      "Complimentary Daily Housekeeping, WiFi & Toiletries",
      "On-Site Gourmet Food & Beverage Options (Extra)",
      "On-Site Massage & Yoga Services (Extra)",
      "Private Airport Transfers (Extra)"
    ],
    showAllAmenities: "Show all amenities",
    rooms: [
      { name: "The Architecture", desc: "Colonial elegance" },
      { name: "The Sanctuary", desc: "Seven exquisite bedrooms" },
      { name: "The Oasis", desc: "Private pools & courtyards" },
      { name: "The Dining", desc: "Culinary excellence" }
    ],
    discover: "Explore",
    galleryTitle: "The Villa"
  },
  es: {
    nav: { home: "Inicio", casaEstrella: "Casa Estrella de San Pedro", villa: "La Villa", accommodations: "Alojamiento", gallery: "Galería", contact: "Contacto" },
    bookNow: "Reservar",
    location: "Cartagena, Colombia",
    heroTitle: "Un Remanso de Paz",
    heroSubtitle: "Experimente la elegancia atemporal de nuestra villa colonial, enclavada en el corazón de la histórica ciudad amurallada.",
    arrival: "Llegada",
    departure: "Salida",
    dates: "Seleccionar fechas",
    guests: "Huéspedes",
    adults: "2 Adultos",
    search: "Ver Disponibilidad",
    welcomeTitle: "Bienvenido a Casa Estrella de San Pedro",
    welcomeText: "Descubra un santuario donde la historia y el lujo se entrelazan. Casa Estrella ofrece siete exquisitas habitaciones, piscinas privadas y exuberantes patios, brindando un refugio incomparable en Cartagena. Cada detalle ha sido cuidadosamente seleccionado para asegurar que su estadía sea nada menos que extraordinaria.",
    aboutTitle: "Acerca de la casa",
    amenitiesTitle: "Comodidades",
    amenitiesList: [
      "Piscina y Mini Piscina",
      "Bar en la Azotea",
      "Mesa de Comedor al Aire Libre",
      "Seguridad 6 PM - 7 AM",
      "Limpieza Diaria, WiFi y Artículos de Aseo de Cortesía",
      "Opciones de Comidas y Bebidas Gourmet en la Casa (Extra)",
      "Servicios de Masajes y Yoga en la Casa (Extra)",
      "Traslados Privados al Aeropuerto (Extra)"
    ],
    showAllAmenities: "Mostrar todas las comodidades",
    rooms: [
      { name: "La Arquitectura", desc: "Elegancia colonial" },
      { name: "El Santuario", desc: "Siete habitaciones exquisitas" },
      { name: "El Oasis", desc: "Piscinas y patios privados" },
      { name: "El Comedor", desc: "Excelencia culinaria" }
    ],
    discover: "Explorar",
    galleryTitle: "La Villa"
  }
};

export function MallorcaTheme({ 
  lang = 'en',
  property = null,
  siteConfig = null
}: { 
  lang?: string,
  property?: any,
  siteConfig?: any
}) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#1A1A1A] font-sans selection:bg-[#8BA3A0] selection:text-white">
      {/* Custom Fonts */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap');
        .font-cormorant { font-family: 'Playfair Display', serif; }
        .font-montserrat { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Header */}
      <header className="fixed top-0 w-full px-6 py-6 flex justify-between items-center z-50 bg-[#1A1A1A]/40 backdrop-blur-md border-b border-white/10 text-white drop-shadow-md transition-all duration-300">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-montserrat text-sm tracking-[0.3em] uppercase font-light text-white hover:text-gray-300 transition-colors">
            {siteConfig?.site_title || "Grupo Zakher"}
          </Link>
        </div>
        <nav className="hidden md:flex gap-10 font-montserrat text-xs tracking-[0.2em] uppercase text-white">
          <Link href={`/${lang}`} className="hover:opacity-70 transition-opacity">{t.nav.home}</Link>
          
          <div className="relative group">
            <button className="hover:opacity-70 transition-opacity flex items-center gap-2 uppercase">
              PROPERTY <span className="text-[8px] opacity-70">▼</span>
            </button>
            <div className="absolute top-full left-0 mt-2 bg-black/95 backdrop-blur-md border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[220px] shadow-2xl py-2">
              <Link href={`/${lang}/property/casa-estrella`} className="block px-6 py-4 text-[10px] tracking-widest uppercase hover:bg-white/10 transition-colors text-white/90 hover:text-white">
                CASA ESTRELLA
              </Link>
            </div>
          </div>

          <a href="#" className="hover:opacity-70 transition-opacity">{t.nav.accommodations}</a>
          <a href="#" className="hover:opacity-70 transition-opacity">{t.nav.gallery}</a>
          <a href="#" className="hover:opacity-70 transition-opacity">{t.nav.contact}</a>
        </nav>
        <button className="border border-white/60 hover:bg-white hover:text-black px-8 py-3 font-montserrat text-xs tracking-[0.2em] uppercase transition-all duration-300 text-white">
          {t.bookNow}
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative h-[100vh] w-full overflow-hidden flex flex-col justify-end pb-32 px-8 md:px-16">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src={property?.image_url || (property?.hero_image ? `https://directus-cms-159885988938.us-central1.run.app/assets/${property.hero_image}` : null) || 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0398-m7V3a5Gq50IoWDoN.jpeg'} 
            alt={property?.title || "Casa Estrella Aerial View"}
            fill
            priority
            quality={100}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#1A1A1A]/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/40 to-transparent"></div>
        </div>

        <div className="relative z-10 text-white max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6 font-montserrat text-xs tracking-[0.2em] uppercase text-white/80">
              <MapPin size={14} />
              <span>{property?.location || "Cartagena, Colombia"}</span>
            </div>
            <h1 className="font-cormorant text-6xl md:text-8xl lg:text-9xl font-light leading-none mb-6 drop-shadow-lg">
              {property?.title || "Casa Estrella de San Pedro"}
            </h1>
            <p className="font-montserrat text-sm md:text-base font-light max-w-xl leading-relaxed text-white/90">
              {property?.description || t.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Widget */}
      <div className="relative z-20 -mt-16 max-w-6xl mx-auto px-6 hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="bg-white shadow-2xl p-2 flex flex-col md:flex-row items-center"
        >
          <div className="flex-1 flex items-center gap-4 px-8 py-4 border-b md:border-b-0 md:border-r border-gray-100 w-full">
            <div className="flex flex-col text-left">
              <span className="font-montserrat text-[10px] text-gray-400 uppercase tracking-widest mb-1">{t.arrival} - {t.departure}</span>
              <span className="font-cormorant text-xl text-gray-800">{t.dates}</span>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-4 px-8 py-4 border-b md:border-b-0 md:border-r border-gray-100 w-full">
            <div className="flex flex-col text-left">
              <span className="font-montserrat text-[10px] text-gray-400 uppercase tracking-widest mb-1">{t.guests}</span>
              <span className="font-cormorant text-xl text-gray-800">{t.adults}</span>
            </div>
          </div>
          <div className="px-4 py-4 w-full md:w-auto">
            <button className="w-full bg-[#1A1A1A] text-white px-10 py-4 font-montserrat text-xs tracking-[0.2em] uppercase hover:bg-[#333] transition-colors">
              {t.search}
            </button>
          </div>
        </motion.div>
      </div>

      {/* About & Amenities */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="mb-16">
          <h2 className="font-cormorant text-4xl md:text-5xl text-[#1A1A1A] mb-8 font-medium">{t.aboutTitle}</h2>
          <p className="font-montserrat text-gray-600 leading-relaxed text-lg md:text-xl font-light">
            {t.welcomeText}
          </p>
        </div>

        <div className="w-full h-px bg-gray-200 mb-16"></div>

        <div>
          <h2 className="font-cormorant text-4xl md:text-5xl text-[#1A1A1A] mb-10 font-medium">{t.amenitiesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-12">
            {t.amenitiesList.map((amenity, index) => (
              <div key={index} className="flex items-center gap-4">
                <Check size={20} className="text-gray-400" strokeWidth={1.5} />
                <span className="font-montserrat text-gray-700 font-light text-base md:text-lg">{amenity}</span>
              </div>
            ))}
          </div>
          <button className="border border-[#1A1A1A] text-[#1A1A1A] px-8 py-3 font-montserrat text-sm font-medium hover:bg-[#1A1A1A] hover:text-white transition-colors">
            {t.showAllAmenities}
          </button>
        </div>
      </section>

      {/* Property Layout & Rates Module */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 md:text-center text-left">
            <span className="font-montserrat text-xs tracking-[0.3em] uppercase text-gray-500 mb-4 block">Floor Plan & Configuration</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-black">Private Villa Layout</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Rooms List */}
            <div className="space-y-6">
              <h3 className="font-montserrat text-xs tracking-[0.2em] uppercase text-black mb-8 border-b pb-4">7 Luxury Bedrooms</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 font-montserrat text-sm font-light text-gray-600">
                <div className="flex border-l-2 border-black/10 pl-4 py-2 flex-col"><span className="font-medium text-black mb-1">Master Suite</span>King bed, Sofa, Bath, TV, A/C</div>
                <div className="flex border-l-2 border-black/10 pl-4 py-2 flex-col"><span className="font-medium text-black mb-1">Junior Suite</span>King bed, Sofa, Bath, TV, A/C</div>
                <div className="flex border-l-2 border-black/10 pl-4 py-2 flex-col"><span className="font-medium text-black mb-1">Double Room 1</span>Double bed, Bath, A/C</div>
                <div className="flex border-l-2 border-black/10 pl-4 py-2 flex-col"><span className="font-medium text-black mb-1">Double Room 2 & 3</span>Double bed, Shared Bath, A/C</div>
                <div className="flex border-l-2 border-black/10 pl-4 py-2 flex-col"><span className="font-medium text-black mb-1">Double Room 4 & 5</span>Double bed, Shared Bath, A/C</div>
              </div>
            </div>

            {/* Rental Rates & Details */}
            <div className="bg-[#1A1A1A] text-white p-10 flex flex-col justify-between h-full">
              <div>
                <h3 className="font-cormorant text-3xl font-light mb-6">Villa Rental Information</h3>
                <p className="font-montserrat text-sm font-light leading-relaxed text-gray-300 mb-8">
                  {property?.title || "Casa Estrella de San Pedro"} is offered exclusively as a completely private villa rental. This historic sanctuary accommodates a maximum of <strong className="text-white font-medium">{property?.max_guests || 16} guests</strong>.
                </p>
                <div className="mb-8">
                  <h4 className="font-montserrat text-[10px] tracking-widest uppercase text-gray-400 mb-4">Amenities & Services</h4>
                  <ul className="space-y-3 font-montserrat text-sm font-light text-white/90">
                    {property?.amenities?.length ? (
                      property.amenities.map((item: any, idx: number) => (
                        <li key={idx} className="flex items-center gap-3">
                          <Check size={16} className="text-white/60" /> 
                          {item.amenity_id?.name || item}
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-center gap-3"><Check size={16} className="text-white/60" /> Pool & Mini Pool</li>
                        <li className="flex items-center gap-3"><Check size={16} className="text-white/60" /> Rooftop Bar</li>
                        <li className="flex items-center gap-3"><Check size={16} className="text-white/60" /> Outdoor Dining Table</li>
                        <li className="flex items-center gap-3"><Check size={16} className="text-white/60" /> Security 6 PM - 7 AM</li>
                        <li className="flex items-center gap-3"><Check size={16} className="text-white/60" /> Complimentary Daily Housekeeping, WiFi & Toiletries</li>
                        <li className="flex items-center gap-3"><Check size={16} className="text-white/60" /> On-Site Gourmet Food & Beverage Options (Extra)</li>
                        <li className="flex items-center gap-3"><Check size={16} className="text-white/60" /> On-Site Massage & Yoga Services (Extra)</li>
                        <li className="flex items-center gap-3"><Check size={16} className="text-white/60" /> Private Airport Transfers (Extra)</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-white/20 pt-6 mt-8">
                <div className="flex justify-between items-center mb-2 font-montserrat text-sm">
                  <span className="font-light text-gray-400 uppercase tracking-widest text-[10px]">Low Season (3 Nights Min)</span>
                  <span>${property?.low_season_rate || "1,050"} <span className="text-[10px] text-gray-400 uppercase">/ night</span></span>
                </div>
                <div className="flex justify-between items-center font-montserrat text-sm">
                  <span className="font-light text-gray-400 uppercase tracking-widest text-[10px]">High Season (7 Nights Min)</span>
                  <span>${property?.high_season_rate || "1,995"} <span className="text-[10px] text-gray-400 uppercase">/ night</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-32 bg-[#1A1A1A] text-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <span className="font-montserrat text-xs tracking-[0.3em] uppercase text-gray-400 mb-4 block">Immerse Yourself</span>
              <h2 className="font-cormorant text-4xl md:text-5xl font-light">{t.galleryTitle}</h2>
            </div>
            <button className="mt-8 md:mt-0 font-montserrat text-xs tracking-[0.2em] uppercase flex items-center gap-2 hover:text-gray-400 transition-colors">
              View Full Gallery <ChevronRight size={14} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(property?.gallery?.length ? property.gallery : [1, 2, 3, 4, 5, 6, 7, 8]).map((item: any, i: number) => {
              const imgSrc = item?.directus_files_id 
                ? `https://directus-cms-159885988938.us-central1.run.app/assets/${item.directus_files_id}` 
                : `/gallery/casa-estrella/img-${String(i+1).padStart(2, '0')}.webp`;
              
              return (
              <div key={i} className={`relative group overflow-hidden ${i === 0 || i === 3 ? 'col-span-2 row-span-2 h-[400px]' : 'h-[192px]'}`}>
                <img 
                  src={imgSrc} 
                  alt={`${property?.title || "Casa Estrella"} Gallery ${i}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center cursor-pointer">
                  <span className="font-montserrat text-[10px] tracking-widest uppercase">View Image</span>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#111] text-white py-20 px-6 text-center">
        <div className="font-montserrat text-sm tracking-[0.3em] uppercase font-light mb-8">
          {property?.title || "Casa Estrella de San Pedro"}
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
                <span className="font-montserrat text-[9px] text-gray-500 uppercase tracking-widest mb-0.5">{t.arrival} - {t.departure}</span>
                <span className="font-cormorant text-xl text-gray-900 leading-none">{t.dates}</span>
              </div>
              <div className="w-[1px] h-8 bg-gray-300"></div>
              <div className="flex flex-col text-left">
                <span className="font-montserrat text-[9px] text-gray-500 uppercase tracking-widest mb-0.5">{t.guests}</span>
                <span className="font-cormorant text-xl text-gray-900 leading-none">{t.adults}</span>
              </div>
            </div>
            <div className="flex-1 md:hidden px-6 text-left">
              <span className="font-cormorant text-xl text-gray-900 leading-none">Casa Estrella</span>
            </div>
            <button className="bg-[#1A1A1A] text-white px-8 py-4 rounded-full font-montserrat text-[10px] tracking-[0.2em] uppercase hover:bg-[#333] transition-colors whitespace-nowrap">
              {t.search}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
