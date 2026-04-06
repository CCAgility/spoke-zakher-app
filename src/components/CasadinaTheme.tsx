import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, ChevronRight, MapPin } from 'lucide-react';

const translations = {
  en: {
    nav: { villa: "The Villa", accommodations: "Accommodations", gallery: "Gallery", contact: "Contact" },
    bookNow: "Book Now",
    location: "Cartagena, Colombia",
    heroTitle: "A Haven of Peace",
    heroSubtitle: "Experience the timeless elegance of our colonial villa, nestled in the heart of the historic walled city.",
    arrival: "Arrival - Departure",
    dates: "Select your dates",
    guests: "Guests",
    adults: "2 Adults",
    search: "Search",
    welcomeTitle: "Welcome to Casa Estrella de San Pedro",
    welcomeText: "Discover a sanctuary where history and luxury intertwine. Casa Estrella offers seven exquisite bedrooms, private pools, and lush courtyards, providing an unparalleled retreat in Cartagena. Every detail has been carefully curated to ensure your stay is nothing short of extraordinary.",
    rooms: [
      { name: "The Architecture" },
      { name: "The Sanctuary" },
      { name: "The Oasis" },
      { name: "The Dining" }
    ],
    discover: "Discover",
    galleryTitle: "The Villa"
  },
  es: {
    nav: { villa: "La Villa", accommodations: "Alojamiento", gallery: "GalerÃ­a", contact: "Contacto" },
    bookNow: "Reservar",
    location: "Cartagena, Colombia",
    heroTitle: "Un Remanso de Paz",
    heroSubtitle: "Experimente la elegancia atemporal de nuestra villa colonial, enclavada en el corazÃ³n de la histÃ³rica ciudad amurallada.",
    arrival: "Llegada - Salida",
    dates: "Seleccione sus fechas",
    guests: "HuÃ©spedes",
    adults: "2 Adultos",
    search: "Buscar",
    welcomeTitle: "Bienvenido a Casa Estrella de San Pedro",
    welcomeText: "Descubra un santuario donde la historia y el lujo se entrelazan. Casa Estrella ofrece siete exquisitas habitaciones, piscinas privadas y exuberantes patios, brindando un refugio incomparable en Cartagena. Cada detalle ha sido cuidadosamente seleccionado para asegurar que su estadÃ­a sea nada menos que extraordinaria.",
    rooms: [
      { name: "La Arquitectura" },
      { name: "El Santuario" },
      { name: "El Oasis" },
      { name: "El Comedor" }
    ],
    discover: "Descubrir",
    galleryTitle: "La Villa"
  }
};

export function CasadinaTheme({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#333333] font-sans selection:bg-[#C2A878] selection:text-white">
      {/* Custom Fonts */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Raleway:wght@300;400;500&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-raleway { font-family: 'Raleway', sans-serif; }
      `}} />

      {/* Header */}
      <header className="fixed top-0 w-full px-8 py-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/60 to-transparent text-white">
        <div className="flex items-center gap-4">
          <div className="font-playfair text-xl md:text-2xl tracking-widest uppercase">
            Casa Estrella
          </div>
        </div>
        <nav className="hidden md:flex gap-8 font-raleway text-sm font-medium tracking-wider uppercase">
          <a href="#" className="hover:text-[#C2A878] transition-colors">{t.nav.villa}</a>
          <a href="#" className="hover:text-[#C2A878] transition-colors">{t.nav.accommodations}</a>
          <a href="#" className="hover:text-[#C2A878] transition-colors">{t.nav.gallery}</a>
          <a href="#" className="hover:text-[#C2A878] transition-colors">{t.nav.contact}</a>
        </nav>
        <button className="bg-[#C2A878] text-white px-6 py-3 font-raleway text-xs font-bold tracking-widest uppercase hover:bg-[#A88D5C] transition-colors">
          {t.bookNow}
        </button>
      </header>

      {/* Hero Section with YouTube Background */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center text-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0644-m5KM1LpyNxsxzl9b.jpeg"
            alt="Casa Estrella Aerial View"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <iframe
            src="https://www.youtube.com/embed/RI6Nuyrd5tg?autoplay=1&mute=1&loop=1&playlist=RI6Nuyrd5tg&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
            className="w-[300vw] h-[300vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ pointerEvents: 'none' }}
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-white px-4 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6 font-raleway text-sm tracking-[0.2em] uppercase">
              <MapPin size={16} className="text-[#C2A878]" />
              <span>{t.location}</span>
            </div>
            <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl font-normal mb-6 drop-shadow-lg">
              {t.heroTitle}
            </h1>
            <p className="font-raleway text-lg md:text-xl font-light max-w-2xl mx-auto drop-shadow-md">
              {t.heroSubtitle}
            </p>
          </motion.div>
        </div>

        {/* Booking Widget */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 z-20 py-6 px-8"
        >
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 flex items-center gap-4 border-r border-gray-300 pr-6 w-full">
              <Calendar className="text-[#C2A878]" size={24} />
              <div className="flex flex-col text-left">
                <span className="font-raleway text-xs font-bold text-gray-500 uppercase tracking-widest">{t.arrival}</span>
                <span className="font-playfair text-lg text-gray-800">{t.dates}</span>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-4 border-r border-gray-300 px-6 w-full">
              <Users className="text-[#C2A878]" size={24} />
              <div className="flex flex-col text-left">
                <span className="font-raleway text-xs font-bold text-gray-500 uppercase tracking-widest">{t.guests}</span>
                <span className="font-playfair text-lg text-gray-800">{t.adults}</span>
              </div>
            </div>
            <div className="pl-6 w-full md:w-auto">
              <button className="w-full bg-[#333333] text-white px-8 py-4 font-raleway text-sm font-bold tracking-widest uppercase hover:bg-black transition-colors flex items-center justify-center gap-2">
                {t.search} <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Introduction */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="font-playfair text-4xl md:text-5xl text-[#333333] mb-8">{t.welcomeTitle}</h2>
        <div className="w-12 h-0.5 bg-[#C2A878] mx-auto mb-8"></div>
        <p className="font-raleway text-gray-600 leading-relaxed text-lg font-light">
          {t.welcomeText}
        </p>
      </section>

      {/* Accommodations Grid */}
      <section className="py-12 px-4 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: t.rooms[0].name, img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0644-m5KM1LpyNxsxzl9b.jpeg" },
            { name: t.rooms[1].name, img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0398-m7V3a5Gq50IoWDoN.jpeg" },
            { name: t.rooms[2].name, img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0667-mxB4RMNwkBc51ekz.jpeg" },
            { name: t.rooms[3].name, img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0430-AVL7R1jyNyFoWb4O.jpeg" }
          ].map((room, i) => (
            <div key={i} className="group relative h-[400px] overflow-hidden cursor-pointer">
              <img 
                src={room.img} 
                alt={room.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-playfair text-2xl mb-2">{room.name}</h3>
                <div className="w-8 h-0.5 bg-[#C2A878] mb-4 transition-all duration-500 group-hover:w-16"></div>
                <span className="font-raleway text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex items-center gap-2">
                  {t.discover} <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl text-[#333333] mb-6">{t.galleryTitle}</h2>
            <div className="w-12 h-0.5 bg-[#C2A878] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0644-m5KM1LpyNxsxzl9b.jpeg",
              "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0389-mp8WRqw9M5T49WDb.jpeg",
              "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0430-AVL7R1jyNyFoWb4O.jpeg",
              "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0398-m7V3a5Gq50IoWDoN.jpeg",
              "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0667-mxB4RMNwkBc51ekz.jpeg",
              "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0644-m5KM1LpyNxsxzl9b.jpeg",
              "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0389-mp8WRqw9M5T49WDb.jpeg",
              "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0398-m7V3a5Gq50IoWDoN.jpeg"
            ].map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden group">
                <img 
                  src={img} 
                  alt={`Gallery image ${i + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}