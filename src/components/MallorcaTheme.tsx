'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, ChevronRight, MapPin, Anchor, Wind, Sun, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ConciergeDrawer } from './ConciergeDrawer';

const translations = {
  en: {
    nav: { home: "Home", property: "Property", casaEstrella: "Casa Estrella de San Pedro", villa: "The Villa", accommodations: "Accommodations", gallery: "Gallery", contact: "Concierge" },
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
    nav: { home: "Inicio", property: "Propiedad", casaEstrella: "Casa Estrella de San Pedro", villa: "La Villa", accommodations: "Alojamiento", gallery: "Galería", contact: "Conserjería" },
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
  },
  pt: {
    nav: { home: "Início", property: "Propriedade", casaEstrella: "Casa Estrella de San Pedro", villa: "A Villa", accommodations: "Acomodações", gallery: "Galeria", contact: "Concierge" },
    bookNow: "Reservar",
    location: "Cartagena, Colômbia",
    heroTitle: "Um Refúgio de Paz",
    heroSubtitle: "Experimente a elegância atemporal da nossa vila colonial, aninhada no coração da histórica cidade murada.",
    arrival: "Check-in",
    departure: "Check-out",
    dates: "Selecionar datas",
    guests: "Hóspedes",
    adults: "2 Adultos",
    search: "Verificar Disponibilidade",
    welcomeTitle: "Bem-vindo à Casa Estrella de San Pedro",
    welcomeText: "Escondida no coração do bairro histórico de Cartagena, a Casa Estrella de San Pedro é um santuário de elegância colonial atemporal. Esta propriedade cuidadosamente restaurada de classe mundial oferece privacidade inigualável, vida de luxo luxuosa e as mais deslumbrantes vistas da cobertura no Caribe.",
    aboutTitle: "Sobre a casa",
    amenitiesTitle: "Comodidades",
    amenitiesList: [
      "Piscina e Mini Piscina",
      "Bar na Cobertura",
      "Mesa de Jantar ao Ar Livre",
      "Segurança 6 PM - 7 AM",
      "Serviço de Limpeza Diário Cortesia, WiFi e Artigos de Banho",
      "Opções de Alimentos e Bebidas Gourmet no Local (Extra)",
      "Serviços de Massagem e Yoga no Local (Extra)",
      "Traslados Particulares do Aeroporto (Extra)"
    ],
    showAllAmenities: "Mostrar todas as comodidades",
    rooms: [
      { name: "A Arquitetura", desc: "Elegância colonial" },
      { name: "O Santuário", desc: "Sete suítes requintadas" },
      { name: "O Oásis", desc: "Piscinas e pátios privativos" },
      { name: "O Jantar", desc: "Excelência culinária" }
    ],
    discover: "Explorar",
    galleryTitle: "A Villa"
  },
  fr: {
    nav: { home: "Accueil", property: "Propriété", casaEstrella: "Casa Estrella de San Pedro", villa: "La Villa", accommodations: "Hébergement", gallery: "Galerie", contact: "Conciergerie" },
    bookNow: "Réserver",
    location: "Carthagène, Colombie",
    heroTitle: "Un Havre de Paix",
    heroSubtitle: "Découvrez l'élégance intemporelle de notre villa coloniale, nichée au cœur de la ville fortifiée historique.",
    arrival: "Arrivée",
    departure: "Départ",
    dates: "Sélectionner dates",
    guests: "Voyageurs",
    adults: "2 Adultes",
    search: "Vérifier la Disponibilité",
    welcomeTitle: "Bienvenue à Casa Estrella de San Pedro",
    welcomeText: "Nichée au cœur du quartier historique de Carthagène, la Casa Estrella de San Pedro est un sanctuaire d'élégance coloniale intemporelle. Ce domaine de classe mondiale méticuleusement restauré offre une intimité inégalée, une vie de luxe somptueuse et les vues sur les toits les plus époustouflantes des Caraïbes.",
    aboutTitle: "À propos de la maison",
    amenitiesTitle: "Commodités",
    amenitiesList: [
      "Piscine et Mini Piscine",
      "Lounge sur le Toit",
      "Table à Manger Extérieure",
      "Sécurité de 18h à 7h",
      "Ménage Quotidien Gratuit, WiFi et Articles de Toilette",
      "Options de Restauration Gastronomique sur Place (En Supplément)",
      "Services de Massage et de Yoga sur Place (En Supplément)",
      "Transferts Aéroport Privés (En Supplément)"
    ],
    showAllAmenities: "Afficher tous les équipements",
    rooms: [
      { name: "L'Architecture", desc: "Élégance coloniale" },
      { name: "Le Sanctuaire", desc: "Sept suites exquises" },
      { name: "L'Oasis", desc: "Piscines et patios privés" },
      { name: "La Salle à Manger", desc: "Excellence culinaire" }
    ],
    discover: "Explorer",
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<'contact'|'reserve'>('reserve');

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
      <header className={`fixed top-0 w-full px-6 py-6 flex justify-between items-center z-50 border-b drop-shadow-md transition-all duration-300 ${showSticky ? 'bg-[#1A1A1A]/95 backdrop-blur-lg border-white/20 text-white' : 'bg-[#1A1A1A]/40 backdrop-blur-md border-white/10 text-white hover:bg-[#1A1A1A]/60'}`}>
        <div className="flex items-center gap-4">
          <Link href={`/${lang}`} className="font-montserrat text-sm tracking-[0.3em] uppercase font-light text-white hover:text-gray-300 transition-colors">
            {siteConfig?.site_title || "Grupo Zakher"}
          </Link>
        </div>
        <nav className="hidden md:flex gap-10 font-montserrat text-xs tracking-[0.2em] uppercase text-white">
          <Link href={`/${lang}`} className="p-3 min-h-[44px] flex items-center hover:opacity-70 transition-opacity uppercase active:scale-95">{t.nav.home}</Link>
          
          <div className="relative group focus-within:opacity-100">
            <button className="p-3 min-h-[44px] min-w-[44px] hover:opacity-70 transition-opacity flex items-center justify-center gap-2 uppercase active:scale-95">
              {t.nav.property} <span className="text-xs opacity-70">▼</span>
            </button>
            <div className="absolute top-full left-0 mt-2 bg-black/95 backdrop-blur-md border border-white/10 border-t-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition-all duration-300 transform origin-top scale-y-0 group-hover:scale-y-100 min-w-[220px] shadow-2xl py-2">
              <div className="absolute top-0 left-0 h-[2px] bg-[#D4AF37] w-0 group-hover:w-full transition-all duration-500 ease-in-out" />
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                <Link href={`/${lang}/property/${property?.slug || 'casa-estrella'}`} className="block px-6 py-4 text-xs tracking-widest uppercase hover:bg-white/10 transition-colors text-white/90 hover:text-white min-h-[44px] flex items-center">
                  {property?.title || t.nav.casaEstrella}
                </Link>
              </div>
            </div>
          </div>

          <button onClick={(e) => { e.preventDefault(); setDrawerTab('contact'); setIsDrawerOpen(true); }} className="p-3 min-h-[44px] hover:opacity-70 transition-opacity uppercase active:scale-95">{t.nav.contact}</button>
        </nav>
        <div className="flex items-center gap-6 hidden">
          <button onClick={() => { setDrawerTab('reserve'); setIsDrawerOpen(true); }} className="border border-white/60 hover:bg-white hover:text-black px-8 py-3 font-montserrat text-xs tracking-[0.2em] uppercase transition-all duration-300 text-white active:scale-95">
            {t.bookNow}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[100vh] w-full overflow-hidden flex flex-col justify-end pb-32 px-8 md:px-16">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src={property?.image_url || (property?.hero_image ? `https://directus-cms-159885988938.us-central1.run.app/assets/${property.hero_image}` : null) || '/gallery/casa-estrella/img-01.webp'} 
            alt={property?.title || "Casa Estrella Aerial View"}
            fill
            priority
            quality={100}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#1A1A1A]/10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-white max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.1 }}
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
              <span className="font-montserrat text-xs text-gray-500 uppercase tracking-widest mb-1">{t.arrival} - {t.departure}</span>
              <span className="font-cormorant text-xl text-gray-800">{t.dates}</span>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-4 px-8 py-4 border-b md:border-b-0 md:border-r border-gray-100 w-full">
            <div className="flex flex-col text-left">
              <span className="font-montserrat text-xs text-gray-500 uppercase tracking-widest mb-1">{t.guests}</span>
              <span className="font-cormorant text-xl text-gray-800">{t.adults}</span>
            </div>
          </div>
          <div className="px-4 py-4 w-full md:w-auto">
            <button className="w-full bg-[#1A1A1A] text-white px-10 py-4 font-montserrat text-xs tracking-[0.2em] uppercase hover:bg-[#333] transition-colors active:scale-95">
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
                <Check size={20} className="text-gray-400" strokeWidth={2} />
                <span className="font-montserrat text-gray-700 font-light text-base md:text-lg">{amenity}</span>
              </div>
            ))}
          </div>
          <button className="border border-[#1A1A1A] text-[#1A1A1A] px-8 py-3 font-montserrat text-sm font-medium hover:bg-[#1A1A1A] hover:text-white transition-colors active:scale-95">
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
                  <h4 className="font-montserrat text-xs tracking-widest uppercase text-gray-500 mb-4">Amenities & Services</h4>
                  <ul className="space-y-3 font-montserrat text-sm font-light text-white/90">
                    {property?.amenities?.length ? (
                      property.amenities.map((item: any, idx: number) => (
                        <li key={idx} className="flex items-center gap-3">
                          <Check size={16} className="text-white/60" strokeWidth={2} /> 
                          {item.amenity_id?.name || item}
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-center gap-3"><Check size={16} className="text-white/60" strokeWidth={2} /> Pool & Mini Pool</li>
                        <li className="flex items-center gap-3"><Check size={16} className="text-white/60" strokeWidth={2} /> Rooftop Bar</li>
                        <li className="flex items-center gap-3"><Check size={16} className="text-white/60" strokeWidth={2} /> Outdoor Dining Table</li>
                        <li className="flex items-center gap-3"><Check size={16} className="text-white/60" strokeWidth={2} /> Security 6 PM - 7 AM</li>
                        <li className="flex items-center gap-3"><Check size={16} className="text-white/60" strokeWidth={2} /> Complimentary Daily Housekeeping, WiFi & Toiletries</li>
                        <li className="flex items-center gap-3"><Check size={16} className="text-white/60" strokeWidth={2} /> On-Site Gourmet Food & Beverage Options (Extra)</li>
                        <li className="flex items-center gap-3"><Check size={16} className="text-white/60" strokeWidth={2} /> On-Site Massage & Yoga Services (Extra)</li>
                        <li className="flex items-center gap-3"><Check size={16} className="text-white/60" strokeWidth={2} /> Private Airport Transfers (Extra)</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-white/20 pt-6 mt-8">
                <div className="flex justify-between items-center mb-2 font-montserrat text-sm">
                  <span className="font-light text-gray-500 uppercase tracking-widest text-xs">Low Season (3 Nights Min)</span>
                  <span>${property?.low_season_rate || "1,050"} <span className="text-xs text-gray-500 uppercase">/ night</span></span>
                </div>
                <div className="flex justify-between items-center font-montserrat text-sm">
                  <span className="font-light text-gray-500 uppercase tracking-widest text-xs">High Season (7 Nights Min)</span>
                  <span>${property?.high_season_rate || "1,995"} <span className="text-xs text-gray-500 uppercase">/ night</span></span>
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
                <Image 
                  src={imgSrc} 
                  alt={`${property?.title || "Casa Estrella"} Gallery ${i}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
                  <span className="font-montserrat text-xs tracking-widest uppercase">View Image</span>
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
        <p className="font-montserrat text-xs tracking-widest text-gray-600 uppercase">
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
                <span className="font-montserrat text-xs text-gray-500 uppercase tracking-widest mb-0.5">{t.arrival} - {t.departure}</span>
                <span className="font-cormorant text-xl text-gray-900 leading-none">{t.dates}</span>
              </div>
              <div className="w-[1px] h-8 bg-gray-300"></div>
              <div className="flex flex-col text-left">
                <span className="font-montserrat text-xs text-gray-500 uppercase tracking-widest mb-0.5">{t.guests}</span>
                <span className="font-cormorant text-xl text-gray-900 leading-none">{t.adults}</span>
              </div>
            </div>
            <div className="flex-1 md:hidden px-6 text-left">
              <span className="font-cormorant text-xl text-gray-900 leading-none">Casa Estrella</span>
            </div>
            <button className="bg-[#1A1A1A] text-white px-8 py-4 rounded-full font-montserrat text-xs tracking-[0.2em] uppercase hover:bg-[#333] transition-colors whitespace-nowrap active:scale-95">
              {t.search}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <ConciergeDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} initialTab={drawerTab} t={t} />
    </div>
  );
}
