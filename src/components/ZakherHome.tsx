'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, ChevronRight, MapPin, Check, X, Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ConciergeDrawer } from './ConciergeDrawer';
import { resolveHeroImage } from '@/lib/image-utils';

const BLUR_PIXEL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8+h8AAqEBzX+j3WAAAAAASUVORK5CYII=";

const translations = {
  en: {
    heroSubtitle: "Premium property management and luxury real estate listings.",
    reserve: "Reserve",
    booking: { checkIn: "Check-in - Check-out", dates: "Select dates", guests: "Guests", adults: "2 Adults", search: "Check Availability" },
    aboutTitle: "About Grupo Zakher",
    aboutPillars: [
      { title: "The Portfolio", desc: "Access the most exclusive residences in Cartagena. Exceptional properties meticulously designed to provide a unique ambiance, seamlessly blending comfort, elegance, and local charm." },
      { title: "The Service", desc: "From personalized service to exclusive amenities, our team ensures every moment is extraordinary. A dedicated concierge curates your stay with private luxury bespoke offerings." },
      { title: "The Discretion", desc: "Designed for high-net-worth guests requiring absolute privacy. Rejuvenating retreats and romantic getaways protected by rigorous, sovereign-level discretion and tranquility." }
    ],
    portfolio: "Our Portfolio",
    nav: { home: "Home", property: "Property", casaEstrella: "Casa Estrella", contact: "Concierge" },
    featured: "Featured Property",
    explore: "Explore",
    contactPrice: "Contact for Price",
    contactForm: { title: "Contact Concierge", subtitle: "How can we assist with your stay?", name: "Full Name *", email: "Email Address *", phone: "WhatsApp / Phone *", language: "Preferred Language (Optional)", requests: "Message/Special Requests *", send: "Send Message", success: "Thanks for your inquiry. A concierge will be in touch shortly.", specifyLanguage: "Please specify language", mandatory: "Indicates a mandatory field" },
    night: "/ Night",
    rights: "All rights reserved.",
    drawer: { bookYourStay: "Book Your Stay", selectDates: "Select your dates to check availability.", dates: "Dates", checkInCheckOut: "Check In - Check Out", guests: "Guests", oneGuest: "1 Guest", twoGuests: "2 Guests", threeGuests: "3 Guests", fourPlusGuests: "4+ Guests", checkAvailability: "Check Availability", reservation: "Reservation", questions: "Questions", checkIn: "Check In", checkOut: "Check Out", numberOfGuests: "Number of Guests", entireVilla: "Entire Villa (Buyout)", threePlusGuests: "3+ Guests" }
  },
  es: {
    heroSubtitle: "Gestión inmobiliaria premium y listados de bienes raíces de lujo.",
    reserve: "Reservar",
    booking: { checkIn: "Llegada - Salida", dates: "Seleccionar fechas", guests: "Huéspedes", adults: "2 Adultos", search: "Ver Disponibilidad" },
    aboutTitle: "Acerca de Grupo Zakher",
    aboutPillars: [
      { title: "El Portafolio", desc: "Acceda a las residencias más exclusivas de Cartagena. Propiedades meticulosamente diseñadas para proporcionar un ambiente único, combinando comodidad, elegancia y encanto local." },
      { title: "El Servicio", desc: "Desde servicio personalizado hasta amenidades exclusivas, nuestro equipo asegura que cada momento sea extraordinario. Un conserje dedicado cura su estadía con ofertas de lujo a medida." },
      { title: "La Discreción", desc: "Diseñado para huéspedes de alto patrimonio que requieren privacidad absoluta. Retiros rejuvenecedores protegidos por una discreción y tranquilidad de nivel soberano." }
    ],
    portfolio: "Nuestro Portafolio",
    nav: { home: "Inicio", property: "Propiedades", casaEstrella: "Casa Estrella", contact: "Conserjería" },
    featured: "Propiedades Destacadas",
    explore: "Explorar",
    contactPrice: "Contactar para Precio",
    contactForm: { title: "Contactar Conserjería", subtitle: "¿Cómo podemos asistirle con su estadía?", name: "Nombre Completo *", email: "Correo Electrónico *", phone: "WhatsApp / Teléfono *", language: "Idioma Preferido (Opcional)", requests: "Mensaje/Solicitudes Especiales *", send: "Enviar Mensaje", success: "Gracias por su consulta. Un conserje se pondrá en contacto pronto.", specifyLanguage: "Por favor especifique el idioma", mandatory: "Indica un campo obligatorio" },
    night: "/ Noche",
    rights: "Todos los derechos reservados.",
    drawer: { bookYourStay: "Reserve su Estancia", selectDates: "Seleccione sus fechas para ver disponibilidad.", dates: "Fechas", checkInCheckOut: "Llegada - Salida", guests: "Huéspedes", oneGuest: "1 Huésped", twoGuests: "2 Huéspedes", threeGuests: "3 Huéspedes", fourPlusGuests: "4+ Huéspedes", checkAvailability: "Ver Disponibilidad", reservation: "Reserva", questions: "Preguntas", checkIn: "Llegada", checkOut: "Salida", numberOfGuests: "Número de Huéspedes", entireVilla: "Villa Entera", threePlusGuests: "3+ Huéspedes" }
  },
  pt: {
    heroSubtitle: "Gestão imobiliária premium e listagens de imóveis de luxo.",
    reserve: "Reservar",
    booking: { checkIn: "Check-in - Check-out", dates: "Selecionar datas", guests: "Hóspedes", adults: "2 Adultos", search: "Verificar Disponibilidade" },
    aboutTitle: "Sobre o Grupo Zakher",
    aboutPillars: [
      { title: "O Portfólio", desc: "Acesse as residências mais exclusivas de Cartagena. Propriedades cuidadosamente projetadas para proporcionar um ambiente único, combinando conforto, elegância e charme local." },
      { title: "O Serviço", desc: "Desde serviços personalizados a comodidades exclusivas, a nossa equipa assegura que cada momento é extraordinário. Um concierge dedicado cria a sua estadia com ofertas personalizadas de luxo." },
      { title: "A Discrição", desc: "Projetado para hóspedes de alto patrimônio que exigem privacidade absoluta. Retiros relaxantes protegidos por uma discrição e tranquilidade rigorosas e de nível soberano." }
    ],
    portfolio: "Nosso Portfólio",
    nav: { home: "Início", property: "Propriedades", casaEstrella: "Casa Estrella", contact: "Concierge" },
    featured: "Propriedades em Destaque",
    explore: "Explorar",
    contactPrice: "Consultar Preço",
    contactForm: { title: "Contatar Concierge", subtitle: "Como podemos ajudar com sua estadia?", name: "Nome Completo *", email: "Endereço de E-mail *", phone: "WhatsApp / Telefone *", language: "Idioma Preferido (Opcional)", requests: "Mensagem/Pedidos Especiais *", send: "Enviar Mensagem", success: "Obrigado por sua consulta. Um concierge entrará em contato em breve.", specifyLanguage: "Por favor especifique o idioma", mandatory: "Indica um campo obrigatório" },
    night: "/ Noite",
    rights: "Todos os direitos reservados.",
    drawer: { bookYourStay: "Reserve sua Estadia", selectDates: "Selecione suas datas para verificar disponibilidade.", dates: "Datas", checkInCheckOut: "Check-in - Check-out", guests: "Hóspedes", oneGuest: "1 Hóspede", twoGuests: "2 Hóspedes", threeGuests: "3 Hóspedes", fourPlusGuests: "4+ Hóspedes", checkAvailability: "Verificar Disponibilidade", reservation: "Reserva", questions: "Perguntas", checkIn: "Check-in", checkOut: "Check-out", numberOfGuests: "Número de Hóspedes", entireVilla: "Villa Inteira", threePlusGuests: "3+ Hóspedes" }
  },
  fr: {
    heroSubtitle: "Gestion immobilière haut de gamme et annonces immobilières de luxe.",
    reserve: "Réserver",
    booking: { checkIn: "Arrivée - Départ", dates: "Sélectionner dates", guests: "Voyageurs", adults: "2 Adultes", search: "Vérifier la Disponibilité" },
    aboutTitle: "À propos de Grupo Zakher",
    aboutPillars: [
      { title: "Le Portefeuille", desc: "Accédez aux résidences les plus exclusives de Carthagène. Des propriétés méticuleusement conçues pour offrir une ambiance unique, mêlant confort, élégance et charme local." },
      { title: "Le Service", desc: "D'un service personnalisé à des installations exclusives, notre équipe s'assure que chaque instant est extraordinaire. Un concierge dédié organise votre séjour avec des offres de luxe sur mesure." },
      { title: "La Discrétion", desc: "Conçu pour les clients fortunés exigeant une intimité absolue. Des retraites ressourçantes protégées par une discrétion et une tranquillité de très haut niveau." }
    ],
    portfolio: "Notre Portefeuille",
    nav: { home: "Accueil", property: "Propriétés", casaEstrella: "Casa Estrella", contact: "Conciergerie" },
    featured: "Propriétés en Vedette",
    explore: "Explorer",
    contactPrice: "Contactez pour le Prix",
    contactForm: { title: "Contacter le Concierge", subtitle: "Comment pouvons-nous vous aider avec votre séjour ?", name: "Nom Complet *", email: "Adresse E-mail *", phone: "WhatsApp / Téléphone *", language: "Langue Préférée (Optionnel)", requests: "Message/Demandes Spéciales *", send: "Envoyer le Message", success: "Merci pour votre demande. Un concierge vous contactera sous peu.", specifyLanguage: "Veuillez préciser la langue", mandatory: "Indique un champ obligatoire" },
    night: "/ Nuit",
    rights: "Tous droits réservés.",
    drawer: { bookYourStay: "Réserver votre Séjour", selectDates: "Sélectionnez vos dates pour vérifier la disponibilité.", dates: "Dates", checkInCheckOut: "Arrivée - Départ", guests: "Voyageurs", oneGuest: "1 Voyageur", twoGuests: "2 Voyageurs", threeGuests: "3 Voyageurs", fourPlusGuests: "4+ Voyageurs", checkAvailability: "Vérifier la Disponibilité", reservation: "Réservation", questions: "Questions", checkIn: "Arrivée", checkOut: "Départ", numberOfGuests: "Nombre de Voyageurs", entireVilla: "Villa Entière", threePlusGuests: "3+ Voyageurs" }
  }
};

function PropertySlideshow({ prop, t, langState, networkQuality }: { prop: any, t: any, langState: string, networkQuality?: number }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const images = prop?.slug === 'casa-estrella' ? [
    resolveHeroImage(prop),
    '/gallery/casa-estrella/5.webp',
    '/gallery/casa-estrella/6.webp',
    '/gallery/casa-estrella/casa-estrella-bedroom.webp',
    '/gallery/casa-estrella/casa-estrella-ext-dining-room.webp',
    '/gallery/casa-estrella/casa-estrella-living-room.webp',
    '/gallery/casa-estrella/casa-estrella-master-suite-1.jpeg'
  ].filter(Boolean) as string[] : [
    resolveHeroImage(prop, '/fallback-luxury.jpg')
  ].filter(Boolean) as string[];

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="group relative h-[600px] overflow-hidden">
      {images.map((src, idx) => (
        <Image 
          key={src}
          src={src}
          alt={prop.title}
          fill
          className={`object-cover transition-opacity duration-[2s] ease-in-out ${idx === currentIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          placeholder="blur"
          blurDataURL={BLUR_PIXEL}
          quality={networkQuality || 85}
        />
      ))}
      <div className="absolute inset-0 z-20 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 pointer-events-none"></div>
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300 text-white">
          <h3 className="font-cormorant text-5xl md:text-6xl font-light mb-8 text-center px-4 drop-shadow-lg">{prop.title}</h3>
          <Link href={`/${langState}/property/${prop.slug}`} className="p-3">
            <button className="group flex items-center gap-2 border border-white px-8 py-3 font-montserrat text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500 active:scale-95 bg-black/20 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]">
              <span>{t.explore}</span>
              <motion.span 
                animate={{ x: [0, 5, 0] }} 
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} 
                className="inline-block opacity-80 group-hover:opacity-100"
              >
                <ChevronRight size={14} strokeWidth={2} />
              </motion.span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ZakherHome({ 
  siteConfig, 
  properties,
  lang,
  networkQuality
}: { 
  siteConfig: any; 
  properties: any[];
  lang?: string;
  networkQuality?: number;
}) {
  const [showSticky, setShowSticky] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<'contact'|'reserve'>('reserve');
  const [inquiryType, setInquiryType] = useState('reservation');
  const [contactLang, setContactLang] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const langState = lang || 'en';

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDrawerOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
      <header className={`fixed top-0 w-full px-6 py-6 flex justify-between items-center z-50 border-b transition-all duration-500 ${showSticky ? 'bg-white/60 backdrop-blur-2xl border-white/40 text-[#1A1A1A] shadow-sm' : 'bg-[#1A1A1A]/40 backdrop-blur-md border-white/10 text-white hover:bg-[#1A1A1A]/60 drop-shadow-md'}`}>
        <div className="flex items-center justify-between w-full max-w-full">
          <div className="flex flex-1 items-center gap-8 lg:gap-12">
            <div className="w-auto flex-shrink-0 break-words">
              <Link href={`/${langState}`} className="font-montserrat text-sm tracking-[0.3em] uppercase font-medium hover:opacity-70 transition-colors">
                {siteConfig?.site_title || "Grupo Zakher"}
              </Link>
            </div>
            <nav className="hidden md:flex gap-4 lg:gap-10 font-montserrat text-xs tracking-[0.2em] uppercase font-medium">
            <div className="p-3 min-h-[44px] flex items-center uppercase invisible pointer-events-none select-none" aria-hidden="true">{t.nav.home}</div>

          <div className="relative group focus-within:opacity-100">
            <button className="p-3 min-h-[44px] min-w-[44px] hover:opacity-70 transition-opacity flex items-center justify-center gap-2 uppercase active:scale-95">
              {t.nav.property} <span className="text-xs opacity-70">▼</span>
            </button>
            <div className={`absolute top-full left-0 mt-[1px] border-t-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition-all duration-300 transform origin-top scale-y-0 group-hover:scale-y-100 min-w-[220px] shadow-2xl py-2 ${showSticky ? 'bg-white/60 backdrop-blur-2xl border border-white/40 text-[#1A1A1A]' : 'bg-[#1A1A1A]/60 backdrop-blur-md border border-white/10 text-white'}`}>
              <div className="absolute top-0 left-0 h-[2px] bg-[#D4AF37] w-0 group-hover:w-full transition-all duration-500 ease-in-out" />
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                {properties && properties.length > 0 ? (
                  properties.map((prop, idx) => (
                    <Link key={prop.slug || idx} href={`/${langState}/property/${prop.slug}`} className={`block px-6 py-4 text-xs tracking-widest uppercase transition-colors min-h-[44px] flex items-center ${showSticky ? 'hover:bg-gray-100 opacity-80 hover:opacity-100' : 'hover:bg-white/10 opacity-90 hover:opacity-100'}`}>
                      {prop.title}
                    </Link>
                  ))
                ) : (
                  <Link href={`/${langState}/property/casa-estrella`} className={`block px-6 py-4 text-xs tracking-widest uppercase transition-colors min-h-[44px] flex items-center ${showSticky ? 'hover:bg-gray-100 opacity-80 hover:opacity-100' : 'hover:bg-white/10 opacity-90 hover:opacity-100'}`}>
                    {t.nav.casaEstrella}
                  </Link>
                )}
              </div>
            </div>
          </div>

            <button onClick={(e) => { e.preventDefault(); if (isDrawerOpen && drawerTab === 'contact') setIsDrawerOpen(false); else { setDrawerTab('contact'); setIsDrawerOpen(true); } }} className="p-3 min-h-[44px] hover:opacity-70 transition-opacity uppercase active:scale-95">{t.nav.contact}</button>
            </nav>
          </div>

          <button 
            className="md:hidden p-2 ml-4 -mr-2 hover:opacity-70 transition-opacity text-current" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <Menu size={24} strokeWidth={1} />
          </button>
        </div>

      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-center pt-10"
          >
            <nav className="flex flex-col items-center gap-12 text-center text-white">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Link href={`/${lang}`} onClick={() => setIsMobileMenuOpen(false)} className="font-cormorant text-4xl drop-shadow-md hover:opacity-70 transition-opacity">
                  {t.nav.home}
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Link href={`/${lang}/property/${properties?.[0]?.slug || 'casa-estrella'}`} onClick={() => setIsMobileMenuOpen(false)} className="font-cormorant text-4xl drop-shadow-md hover:opacity-70 transition-opacity">
                  {t.nav.property}
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <button onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); setDrawerTab('contact'); setIsDrawerOpen(true); }} className="font-cormorant text-4xl drop-shadow-md hover:opacity-70 transition-opacity">
                  {t.nav.contact}
                </button>
              </motion.div>
            </nav>
            <button onClick={() => setIsMobileMenuOpen(false)} className="mt-24 text-gray-500 hover:text-white transition-colors duration-300">
               <X size={32} strokeWidth={1} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[100vh] w-full overflow-hidden flex flex-col justify-end pb-32 px-8 md:px-16">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src={siteConfig?.hero_image || "/parent-hero.jpg"}
            alt={siteConfig?.site_title || "Grupo Zakher Night Skyline"}
            className="object-cover"
            fill
            priority
            placeholder="blur"
            blurDataURL={BLUR_PIXEL}
            quality={networkQuality || 85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-white max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.1 }}
          >
            <button onClick={() => setIsMapOpen(true)} className="flex items-center gap-3 mb-6 font-montserrat text-xs tracking-[0.2em] uppercase text-white/80 hover:text-white transition-colors group cursor-pointer">
              <MapPin size={14} className="group-hover:scale-110 transition-transform" />
              <span className="border-b border-transparent group-hover:border-white/50 transition-colors pb-1">Cartagena, Colombia</span>
            </button>
            <h1 className="font-cormorant text-6xl md:text-8xl lg:text-9xl font-light leading-none mb-6 drop-shadow-lg">
              {siteConfig?.site_title || "Grupo Zakher"}
            </h1>
            <p className="font-montserrat text-sm md:text-base font-light max-w-xl leading-relaxed text-white/90 drop-shadow-md">
              {t.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>


      {/* About Grupo Zakher - 3 Pillar Editorial Grid */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="font-cormorant text-4xl md:text-5xl text-[#1A1A1A] mb-8 font-medium">{t.aboutTitle}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {t.aboutPillars?.map((pillar: any, idx: number) => (
            <div key={idx} className="group flex flex-col pt-8 border-t border-[#D4AF37]/30 transition-all duration-500 hover:border-[#D4AF37]">
              <h3 className="font-cormorant text-3xl text-[#1A1A1A] mb-4 font-medium group-hover:-translate-y-1 transition-transform duration-500">
                {pillar.title}
              </h3>
              <p className="font-montserrat text-gray-500 leading-relaxed text-[15px] font-light">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid - Sovereign Property Loop */}
      <section className="py-16 px-6 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <span className="font-montserrat text-xs tracking-[0.3em] uppercase text-gray-500 mb-4 block">{t.portfolio}</span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-black">{t.featured}</h2>
        </div>
        <div className={`grid grid-cols-1 ${properties && properties.length > 1 ? 'md:grid-cols-2' : 'max-w-5xl mx-auto w-full'} gap-8`}>
          {properties?.map((prop, i) => (
            <PropertySlideshow key={prop.slug || i} prop={prop} t={t} langState={langState} networkQuality={networkQuality} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 text-[#1A1A1A] py-20 px-6 text-center">
        <div className="font-montserrat text-sm tracking-[0.3em] uppercase mb-8">
          {siteConfig?.site_title || "Grupo Zakher"}
        </div>
        <p className="font-montserrat text-xs tracking-widest text-gray-400 uppercase">
          &copy; {new Date().getFullYear()} {siteConfig?.site_title || "Grupo Zakher"}. {t.rights}
        </p>
      </footer>


      {/* Contact Drawer - 60/40 Split */}
      <ConciergeDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} initialTab={drawerTab} t={t} />

      {/* Location Map Modal (Option B: Promax Glassmorphic) */}
      <AnimatePresence>
        {isMapOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 md:p-10"
            onClick={() => setIsMapOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl aspect-video md:h-[80vh] bg-[#1A1A1A] border border-white/10 shadow-2xl overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="absolute top-6 right-6 z-10 text-white hover:text-gray-300 transition-colors bg-black/50 backdrop-blur-md p-3 rounded-full" onClick={() => setIsMapOpen(false)}>
                <X size={20} strokeWidth={1.5} />
              </button>
              
              <div className="absolute top-6 left-6 z-10 px-6 py-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg text-white pointer-events-none">
                <span className="block font-montserrat text-xs tracking-[0.3em] uppercase text-gray-400 mb-1">Location</span>
                <span className="font-cormorant text-2xl md:text-3xl font-light">Cartagena, Colombia</span>
              </div>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15694.026857147746!2d-75.55627!3d10.42253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef625e1a12002cd%3A0xe6ea31baf9708272!2sCartagena%2C%20Bol%C3%ADvar%2C%20Colombia!5e0!3m2!1sen!2sus!4v1683407238217!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(100%) hue-rotate(180deg) brightness(85%) contrast(110%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
