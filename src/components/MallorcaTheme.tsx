// @ts-nocheck — Legacy Vite component, not used by Next.js App Router
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, ChevronRight, MapPin, Anchor, Wind, Sun, Check } from 'lucide-react';
import Link from 'next/link';

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
      "Air conditioning", "WiFi",
      "Private pool", "Daily housekeeping",
      "Concierge", "Breakfast included",
      "Fully equipped kitchen", "Smart TV"
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
    nav: { home: "Inicio", casaEstrella: "Casa Estrella de San Pedro", villa: "La Villa", accommodations: "Alojamiento", gallery: "GalerÃ­a", contact: "Contacto" },
    bookNow: "Reservar",
    location: "Cartagena, Colombia",
    heroTitle: "Un Remanso de Paz",
    heroSubtitle: "Experimente la elegancia atemporal de nuestra villa colonial, enclavada en el corazÃ³n de la histÃ³rica ciudad amurallada.",
    arrival: "Llegada",
    departure: "Salida",
    dates: "Seleccionar fechas",
    guests: "HuÃ©spedes",
    adults: "2 Adultos",
    search: "Ver Disponibilidad",
    welcomeTitle: "Bienvenido a Casa Estrella de San Pedro",
    welcomeText: "Descubra un santuario donde la historia y el lujo se entrelazan. Casa Estrella ofrece siete exquisitas habitaciones, piscinas privadas y exuberantes patios, brindando un refugio incomparable en Cartagena. Cada detalle ha sido cuidadosamente seleccionado para asegurar que su estadÃ­a sea nada menos que extraordinaria.",
    aboutTitle: "Acerca de la casa",
    amenitiesTitle: "Comodidades",
    amenitiesList: [
      "Aire acondicionado", "WiFi",
      "Piscina privada", "Limpieza diaria",
      "Conserje", "Desayuno incluido",
      "Cocina totalmente equipada", "Smart TV"
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

export function MallorcaTheme({ lang = 'en' }: { lang?: string }) {
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@200;300;400;500&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
      `}} />

      {/* Header */}
      <header className="fixed top-0 w-full px-6 py-8 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white drop-shadow-md">
        <div className="flex items-center gap-4">
          <div className="font-montserrat text-sm tracking-[0.3em] uppercase font-light text-white">
            Casa Estrella
          </div>
        </div>
        <nav className="hidden md:flex gap-10 font-montserrat text-xs tracking-[0.2em] uppercase text-white">
          <Link href="/" className="hover:opacity-70 transition-opacity">{t.nav.home}</Link>
          <Link href="/casa-estrella" className="hover:opacity-70 transition-opacity">{t.nav.casaEstrella}</Link>
          <a href="#" className="hover:opacity-70 transition-opacity">{t.nav.villa}</a>
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
          <img 
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0644-m5KM1LpyNxsxzl9b.jpeg"
            alt="Casa Estrella Aerial View"
            className="absolute inset-0 w-full h-full object-cover scale-105"
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
              <span>{t.location}</span>
            </div>
            <h1 className="font-cormorant text-6xl md:text-8xl lg:text-9xl font-light leading-none mb-6">
              {t.heroTitle}
            </h1>
            <p className="font-montserrat text-sm md:text-base font-light max-w-xl leading-relaxed text-white/90">
              {t.heroSubtitle}
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

      {/* Features Grid */}
      <section className="py-16 px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { name: t.rooms[0].name, desc: t.rooms[0].desc, img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0644-m5KM1LpyNxsxzl9b.jpeg" },
            { name: t.rooms[1].name, desc: t.rooms[1].desc, img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0398-m7V3a5Gq50IoWDoN.jpeg" },
            { name: t.rooms[2].name, desc: t.rooms[2].desc, img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0667-mxB4RMNwkBc51ekz.jpeg" },
            { name: t.rooms[3].name, desc: t.rooms[3].desc, img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0430-AVL7R1jyNyFoWb4O.jpeg" }
          ].map((room, i) => (
            <div key={i} className="group relative h-[600px] overflow-hidden">
              <img 
                src={room.img} 
                alt={room.name} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <span className="font-montserrat text-xs tracking-[0.3em] uppercase mb-4">{room.desc}</span>
                <h3 className="font-cormorant text-4xl font-light mb-8">{room.name}</h3>
                <button className="border border-white px-8 py-3 font-montserrat text-[10px] tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-300">
                  {t.discover}
                </button>
              </div>
            </div>
          ))}
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0389-mp8WRqw9M5T49WDb.jpeg",
              "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0430-AVL7R1jyNyFoWb4O.jpeg",
              "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0667-mxB4RMNwkBc51ekz.jpeg"
            ].map((img, i) => (
              <div key={i} className="aspect-[3/4] overflow-hidden">
                <img 
                  src={img} 
                  alt={`Gallery image ${i + 1}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#111] text-white py-20 px-6 text-center">
        <div className="font-montserrat text-sm tracking-[0.3em] uppercase font-light mb-8">
          Casa Estrella de San Pedro
        </div>
        <p className="font-montserrat text-[10px] tracking-widest text-gray-500 uppercase">
          &copy; {new Date().getFullYear()} Casa Estrella. All rights reserved.
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