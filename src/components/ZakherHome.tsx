'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, ChevronRight, MapPin, Check } from 'lucide-react';
import Link from 'next/link';
import { Globe } from 'lucide-react';

const translations = {
  en: {
    nav: { home: "HOME", property: "PROPERTY", casaEstrella: "CASA ESTRELLA", contact: "CONTACT" },
    reserve: "Reserve",
    booking: { checkIn: "Check-in - Check-out", dates: "Select dates", guests: "Guests", adults: "2 Adults", search: "Check Availability" },
    aboutTitle: "About Grupo Zakher",
    aboutP1: "At our company, we are dedicated to curating the finest luxury experiences in the stunning city of Cartagena. With exceptional properties at our disposal, we strive to offer our guests unforgettable stays that seamlessly blend comfort, elegance, and local charm.",
    aboutP2: "Each property is meticulously designed to provide a unique ambiance, allowing visitors to immerse themselves in the vibrant culture and rich history of Cartagena. From personalized service to exclusive amenities, our team is committed to ensuring that every moment spent with us is extraordinary. Whether you're seeking a romantic getaway, a family vacation, or a rejuvenating retreat, we invite you to discover the ultimate in luxury hospitality through our exceptional offerings. Experience Cartagena like never before and create lasting memories in our lavish accommodations.",
    portfolio: "Our Portfolio",
    featured: "Featured Properties",
    explore: "Explore",
    contactPrice: "Contact for Price",
    night: "/ Night",
    rights: "All rights reserved."
  },
  es: {
    nav: { home: "INICIO", property: "PROPIEDAD", casaEstrella: "CASA ESTRELLA", contact: "CONTACTO" },
    reserve: "Reservar",
    booking: { checkIn: "Llegada - Salida", dates: "Seleccionar fechas", guests: "Huéspedes", adults: "2 Adultos", search: "Ver Disponibilidad" },
    aboutTitle: "Acerca de Grupo Zakher",
    aboutP1: "En nuestra empresa, nos dedicamos a curar las mejores experiencias de lujo en la impresionante ciudad de Cartagena. Con propiedades excepcionales a nuestra disposición, nos esforzamos por ofrecer a nuestros huéspedes estadías inolvidables que combinan a la perfección comodidad, elegancia y encanto local.",
    aboutP2: "Cada propiedad está meticulosamente diseñada para proporcionar un ambiente único, permitiendo a los visitantes sumergirse en la vibrante cultura y rica historia de Cartagena. Desde un servicio personalizado hasta comodidades exclusivas, nuestro equipo se compromete a garantizar que cada momento que pase con nosotros sea extraordinario. Ya sea que busque una escapada romántica, unas vacaciones familiares o un retiro rejuvenecedor, lo invitamos a descubrir lo último en hospitalidad de lujo a través de nuestras ofertas excepcionales. Experimente Cartagena como nunca antes y cree recuerdos duraderos en nuestros espléndidos alojamientos.",
    portfolio: "Nuestro Portafolio",
    featured: "Propiedades Destacadas",
    explore: "Explorar",
    contactPrice: "Contactar para Precio",
    night: "/ Noche",
    rights: "Todos los derechos reservados."
  }
};

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
  // Remove isolated state since Next.js passing new `lang` prop needs to trigger re-renders natively on soft-nav
  const langState = lang || 'en';

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = translations[langState as keyof typeof translations] || translations.en;

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
          <Link href={`/${langState}`} className="hover:opacity-70 transition-opacity uppercase">{t.nav.home}</Link>
          
          <div className="relative group">
            <button className="hover:opacity-70 transition-opacity flex items-center gap-2 uppercase">
              {t.nav.property} <span className="text-[8px] opacity-70">▼</span>
            </button>
            <div className="absolute top-full left-0 mt-2 bg-black/95 backdrop-blur-md border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[220px] shadow-2xl py-2">
              <Link href={`/${langState}/property/casa-estrella`} className="block px-6 py-4 text-[10px] tracking-widest uppercase hover:bg-white/10 transition-colors text-white/90 hover:text-white">
                {t.nav.casaEstrella}
              </Link>
            </div>
          </div>

          <button className="hover:opacity-70 transition-opacity uppercase">{t.nav.contact}</button>
        </nav>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-[10px] font-montserrat tracking-widest text-white/70">
            <Globe size={14} />
            <Link href="/en" className={`hover:text-white transition-colors ${langState === 'en' ? 'text-white' : ''}`}>EN</Link>
            <Link href="/es" className={`hover:text-white transition-colors ${langState === 'es' ? 'text-white' : ''}`}>ES</Link>
          </div>
          <button className="border border-white/60 hover:bg-white hover:text-black px-8 py-3 font-montserrat text-xs tracking-[0.2em] uppercase transition-all duration-300 text-white">
            {t.reserve}
          </button>
        </div>
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
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
      <div className="relative z-20 -mt-16 max-w-6xl mx-auto px-6 hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="bg-white shadow-2xl p-2 flex flex-col md:flex-row items-center"
        >
          <div className="flex-1 flex items-center gap-4 px-8 py-4 border-b md:border-b-0 md:border-r border-gray-100 w-full">
            <div className="flex flex-col text-left">
              <span className="font-montserrat text-[10px] text-gray-400 uppercase tracking-widest mb-1">{t.booking.checkIn}</span>
              <span className="font-cormorant text-xl text-gray-800">{t.booking.dates}</span>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-4 px-8 py-4 border-b md:border-b-0 md:border-r border-gray-100 w-full">
            <div className="flex flex-col text-left">
              <span className="font-montserrat text-[10px] text-gray-400 uppercase tracking-widest mb-1">{t.booking.guests}</span>
              <span className="font-cormorant text-xl text-gray-800">{t.booking.adults}</span>
            </div>
          </div>
          <div className="px-4 py-4 w-full md:w-auto">
            <button className="w-full bg-[#1A1A1A] text-white px-10 py-4 font-montserrat text-xs tracking-[0.2em] uppercase hover:bg-[#333] transition-colors">
              {t.booking.search}
            </button>
          </div>
        </motion.div>
      </div>

      {/* About Grupo Zakher */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="mb-16">
          <h2 className="font-cormorant text-4xl md:text-5xl text-[#1A1A1A] mb-8 font-medium">{t.aboutTitle}</h2>
          <p className="font-montserrat text-gray-600 leading-relaxed text-lg md:text-xl font-light">
            {t.aboutP1}
            <br /><br />
            {t.aboutP2}
          </p>
        </div>
      </section>

      {/* Features Grid - Sovereign Property Loop */}
      <section className="py-16 px-6 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <span className="font-montserrat text-xs tracking-[0.3em] uppercase text-gray-500 mb-4 block">{t.portfolio}</span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-black">{t.featured}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {properties?.map((prop, i) => (
            <div key={i} className="group relative h-[600px] overflow-hidden">
              <img 
                src={prop?.image_url || (prop?.hero_image ? `https://directus-cms-159885988938.us-central1.run.app/assets/${prop.hero_image}` : null) || (prop?.slug === 'casa-estrella' ? '/gallery/casa-estrella/img-01.webp' : '/fallback-luxury.jpg')} 
                alt={prop.title} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-700"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <span className="font-montserrat text-xs tracking-[0.3em] uppercase mb-4">{prop.price ? `$${prop.price} ${t.night}` : t.contactPrice}</span>
                <h3 className="font-cormorant text-4xl font-light mb-8 text-center px-4">{prop.title}</h3>
                <Link href={`/${langState}/property/${prop.slug}`}>
                  <button className="border border-white px-8 py-3 font-montserrat text-[10px] tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-300">
                    {t.explore}
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
          &copy; {new Date().getFullYear()} {siteConfig?.site_title || "Grupo Zakher"}. {t.rights}
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
            className="hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl bg-white/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-full border border-white/60 p-2 items-center justify-between"
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
