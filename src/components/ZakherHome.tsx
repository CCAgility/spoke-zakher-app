'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, ChevronRight, MapPin, Check, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Globe } from 'lucide-react';

const translations = {
  en: {
    nav: { home: "HOME", property: "PROPERTY", casaEstrella: "CASA ESTRELLA", contact: "CONTACT" },
    heroSubtitle: "Premium property management and luxury real estate listings.",
    reserve: "Reserve",
    booking: { checkIn: "Check-in - Check-out", dates: "Select dates", guests: "Guests", adults: "2 Adults", search: "Check Availability" },
    aboutTitle: "About Grupo Zakher",
    aboutP1: "At our company, we are dedicated to curating the finest luxury experiences in the stunning city of Cartagena. With exceptional properties at our disposal, we strive to offer our guests unforgettable stays that seamlessly blend comfort, elegance, and local charm.",
    aboutP2: "Each property is meticulously designed to provide a unique ambiance, allowing visitors to immerse themselves in the vibrant culture and rich history of Cartagena. From personalized service to exclusive amenities, our team is committed to ensuring that every moment spent with us is extraordinary. Whether you're seeking a romantic getaway, a family vacation, or a rejuvenating retreat, we invite you to discover the ultimate in luxury hospitality through our exceptional offerings. Experience Cartagena like never before and create lasting memories in our lavish accommodations.",
    portfolio: "Our Portfolio",
    featured: "Featured Properties",
    explore: "Explore",
    contactPrice: "Contact for Price",
    contactForm: { title: "Contact Concierge", subtitle: "How can we assist with your stay?", name: "Full Name *", email: "Email Address *", phone: "WhatsApp / Phone *", language: "Preferred Language (Optional)", requests: "Message/Special Requests *", send: "Send Message", success: "Thanks for your inquiry. A concierge will be in touch shortly.", specifyLanguage: "Please specify language", mandatory: "Indicates a mandatory field" },
    night: "/ Night",
    rights: "All rights reserved."
  },
  es: {
    nav: { home: "INICIO", property: "PROPIEDAD", casaEstrella: "CASA ESTRELLA", contact: "CONTACTO" },
    heroSubtitle: "Gestión inmobiliaria premium y listados de bienes raíces de lujo.",
    reserve: "Reservar",
    booking: { checkIn: "Llegada - Salida", dates: "Seleccionar fechas", guests: "Huéspedes", adults: "2 Adultos", search: "Ver Disponibilidad" },
    aboutTitle: "Acerca de Grupo Zakher",
    aboutP1: "En nuestra empresa, nos dedicamos a curar las mejores experiencias de lujo en la impresionante ciudad de Cartagena. Con propiedades excepcionales a nuestra disposición, nos esforzamos por ofrecer a nuestros huéspedes estadías inolvidables que combinan a la perfección comodidad, elegancia y encanto local.",
    aboutP2: "Cada propiedad está meticulosamente diseñada para proporcionar un ambiente único, permitiendo a los visitantes sumergirse en la vibrante cultura y rica historia de Cartagena. Desde un servicio personalizado hasta comodidades exclusivas, nuestro equipo se compromete a garantizar que cada momento que pase con nosotros sea extraordinario. Ya sea que busque una escapada romántica, unas vacaciones familiares o un retiro rejuvenecedor, lo invitamos a descubrir lo último en hospitalidad de lujo a través de nuestras ofertas excepcionales. Experimente Cartagena como nunca antes y cree recuerdos duraderos en nuestros espléndidos alojamientos.",
    portfolio: "Nuestro Portafolio",
    featured: "Propiedades Destacadas",
    explore: "Explorar",
    contactPrice: "Contactar para Precio",
    contactForm: { title: "Contactar Conserjería", subtitle: "¿Cómo podemos asistirle con su estadía?", name: "Nombre Completo *", email: "Correo Electrónico *", phone: "WhatsApp / Teléfono *", language: "Idioma Preferido (Opcional)", requests: "Mensaje/Solicitudes Especiales *", send: "Enviar Mensaje", success: "Gracias por su consulta. Un conserje se pondrá en contacto pronto.", specifyLanguage: "Por favor especifique el idioma", mandatory: "Indica un campo obligatorio" },
    night: "/ Noche",
    rights: "Todos los derechos reservados."
  },
  pt: {
    nav: { home: "INÍCIO", property: "PROPRIEDADE", casaEstrella: "CASA ESTRELLA", contact: "CONTATO" },
    heroSubtitle: "Gestão imobiliária premium e listagens de imóveis de luxo.",
    reserve: "Reservar",
    booking: { checkIn: "Check-in - Check-out", dates: "Selecionar datas", guests: "Hóspedes", adults: "2 Adultos", search: "Verificar Disponibilidade" },
    aboutTitle: "Sobre o Grupo Zakher",
    aboutP1: "Em nossa empresa, nos dedicamos a organizar as melhores experiências de luxo na deslumbrante cidade de Cartagena. Com propriedades excepcionais à nossa disposição, nos esforçamos para oferecer aos hóspedes estadias inesquecíveis que combinam conforto, elegância e charme local.",
    aboutP2: "Cada propriedade é cuidadosamente projetada para proporcionar um ambiente único, permitindo aos visitantes mergulhar na rica história de Cartagena. Desde serviços personalizados a comodidades exclusivas, a nossa equipa assegura que cada momento é extraordinário.",
    portfolio: "Nosso Portfólio",
    featured: "Propriedades em Destaque",
    explore: "Explorar",
    contactPrice: "Consultar Preço",
    contactForm: { title: "Contatar Concierge", subtitle: "Como podemos ajudar com sua estadia?", name: "Nome Completo *", email: "Endereço de E-mail *", phone: "WhatsApp / Telefone *", language: "Idioma Preferido (Opcional)", requests: "Mensagem/Pedidos Especiais *", send: "Enviar Mensagem", success: "Obrigado por sua consulta. Um concierge entrará em contato em breve.", specifyLanguage: "Por favor especifique o idioma", mandatory: "Indica um campo obrigatório" },
    night: "/ Noite",
    rights: "Todos os direitos reservados."
  },
  fr: {
    nav: { home: "ACCUEIL", property: "PROPRIÉTÉ", casaEstrella: "CASA ESTRELLA", contact: "CONTACT" },
    heroSubtitle: "Gestion immobilière haut de gamme et annonces immobilières de luxe.",
    reserve: "Réserver",
    booking: { checkIn: "Arrivée - Départ", dates: "Sélectionnez vos dates", guests: "Voyageurs", adults: "2 Adultes", search: "Vérifier la Disponibilité" },
    aboutTitle: "À propos de Grupo Zakher",
    aboutP1: "Dans notre entreprise, nous nous engageons à offrir les meilleures expériences de luxe dans la magnifique ville de Carthagène. Avec des propriétés exceptionnelles à notre disposition, nous nous efforçons d'offrir à nos invités des séjours inoubliables où se mêlent confort, élégance et charme local.",
    aboutP2: "Chaque propriété est méticuleusement conçue pour offrir une ambiance unique, permettant aux visiteurs de s'immerger dans la culture vibrante et la riche histoire de Carthagène. D'un service personnalisé à des installations exclusives, notre équipe s'assure que chaque instant passé avec nous est extraordinaire.",
    portfolio: "Notre Portefeuille",
    featured: "Propriétés en Vedette",
    explore: "Explorer",
    contactPrice: "Contactez pour le Prix",
    contactForm: { title: "Contacter le Concierge", subtitle: "Comment pouvons-nous vous aider avec votre séjour ?", name: "Nom Complet *", email: "Adresse E-mail *", phone: "WhatsApp / Téléphone *", language: "Langue Préférée (Optionnel)", requests: "Message/Demandes Spéciales *", send: "Envoyer le Message", success: "Merci pour votre demande. Un concierge vous contactera sous peu.", specifyLanguage: "Veuillez préciser la langue", mandatory: "Indique un champ obligatoire" },
    night: "/ Nuit",
    rights: "Tous droits réservés."
  }
};

function PropertySlideshow({ prop, t, langState }: { prop: any; t: any; langState: string }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const images = prop?.slug === 'casa-estrella' ? [
    prop?.image_url || (prop?.hero_image ? `https://directus-cms-159885988938.us-central1.run.app/assets/${prop.hero_image}` : null) || '/gallery/casa-estrella/img-01.webp',
    '/gallery/casa-estrella/5.webp',
    '/gallery/casa-estrella/6.webp',
    '/gallery/casa-estrella/casa-estrella-bedroom.webp',
    '/gallery/casa-estrella/casa-estrella-ext-dining-room.webp',
    '/gallery/casa-estrella/casa-estrella-living-room.webp',
    '/gallery/casa-estrella/casa-estrella-master-suite-1.jpeg'
  ].filter(Boolean) as string[] : [
    prop?.image_url || (prop?.hero_image ? `https://directus-cms-159885988938.us-central1.run.app/assets/${prop.hero_image}` : null) || '/fallback-luxury.jpg'
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
        />
      ))}
      <div className="absolute inset-0 z-20 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 pointer-events-none"></div>
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300 text-white">
          <h3 className="font-cormorant text-5xl md:text-6xl font-light mb-8 text-center px-4 drop-shadow-lg">{prop.title}</h3>
          <Link href={`/${langState}/property/${prop.slug}`} className="p-3">
            <button className="border border-white px-8 py-3 font-montserrat text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300 active:scale-95 bg-black/20 backdrop-blur-sm animate-pulse hover:animate-none shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]">
              {t.explore}
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
  lang
}: { 
  siteConfig: any; 
  properties: any[];
  lang?: string;
}) {
  const [showSticky, setShowSticky] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<'contact'|'reserve'>('reserve');
  const [inquiryType, setInquiryType] = useState('reservation');
  const [contactLang, setContactLang] = useState("");
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
      <header className={`fixed top-0 w-full px-6 py-6 flex justify-between items-center z-50 border-b drop-shadow-md transition-all duration-300 ${showSticky ? 'bg-[#1A1A1A]/95 backdrop-blur-lg border-white/20 text-white' : 'bg-[#1A1A1A]/40 backdrop-blur-md border-white/10 text-white hover:bg-[#1A1A1A]/60'}`}>
        <div className="flex items-center gap-4">
          <div className="font-montserrat text-sm tracking-[0.3em] uppercase font-light text-white">
            {siteConfig?.site_title || "Grupo Zakher"}
          </div>
        </div>
        <nav className="hidden md:flex gap-10 font-montserrat text-xs tracking-[0.2em] uppercase text-white">
          <Link href={`/${langState}`} className="p-3 min-h-[44px] flex items-center hover:opacity-70 transition-opacity uppercase active:scale-95">{t.nav.home}</Link>
          
          <div className="relative group focus-within:opacity-100">
            <button className="p-3 min-h-[44px] min-w-[44px] hover:opacity-70 transition-opacity flex items-center justify-center gap-2 uppercase active:scale-95">
              {t.nav.property} <span className="text-xs opacity-70">▼</span>
            </button>
            <div className="absolute top-full left-0 mt-2 bg-black/95 backdrop-blur-md border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition-all duration-300 min-w-[220px] shadow-2xl py-2">
              {properties && properties.length > 0 ? (
                properties.map((prop, idx) => (
                  <Link key={prop.slug || idx} href={`/${langState}/property/${prop.slug}`} className="block px-6 py-4 text-xs tracking-widest uppercase hover:bg-white/10 transition-colors text-white/90 hover:text-white p-3 min-h-[44px] flex items-center">
                    {prop.title}
                  </Link>
                ))
              ) : (
                <Link href={`/${langState}/property/casa-estrella`} className="block px-6 py-4 text-xs tracking-widest uppercase hover:bg-white/10 transition-colors text-white/90 hover:text-white p-3 min-h-[44px] flex items-center">
                  {t.nav.casaEstrella}
                </Link>
              )}
            </div>
          </div>

          <button onClick={() => { setDrawerTab('contact'); setIsDrawerOpen(true); }} className="p-3 min-h-[44px] hover:opacity-70 transition-opacity uppercase active:scale-95">{t.nav.contact}</button>
        </nav>
        <div className="flex items-center gap-6 hidden">
          <button onClick={() => { setDrawerTab('reserve'); setIsDrawerOpen(true); }} className="border border-white/60 hover:bg-white hover:text-black px-8 py-3 font-montserrat text-xs tracking-[0.2em] uppercase transition-all duration-300 text-white active:scale-95">
            {t.reserve}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[100vh] w-full overflow-hidden flex flex-col justify-end pb-32 px-8 md:px-16">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src={siteConfig?.hero_image || "/parent-hero.jpg"}
            alt={siteConfig?.site_title || "Grupo Zakher Night Skyline"}
            className="object-cover"
            fill
            priority
          />
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
              <span>Cartagena, Colombia</span>
            </div>
            <h1 className="font-cormorant text-6xl md:text-8xl lg:text-9xl font-light leading-none mb-6 drop-shadow-lg">
              {siteConfig?.site_title || "Grupo Zakher"}
            </h1>
            <p className="font-montserrat text-sm md:text-base font-light max-w-xl leading-relaxed text-white/90 drop-shadow-md">
              {t.heroSubtitle}
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
              <span className="font-montserrat text-xs text-gray-500 uppercase tracking-widest mb-1">{t.booking.checkIn}</span>
              <span className="font-cormorant text-xl text-gray-800">{t.booking.dates}</span>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-4 px-8 py-4 border-b md:border-b-0 md:border-r border-gray-100 w-full">
            <div className="flex flex-col text-left">
              <span className="font-montserrat text-xs text-gray-500 uppercase tracking-widest mb-1">{t.booking.guests}</span>
              <span className="font-cormorant text-xl text-gray-800">{t.booking.adults}</span>
            </div>
          </div>
          <div className="px-4 py-4 w-full md:w-auto">
            <button className="w-full bg-[#1A1A1A] text-white px-10 py-4 font-montserrat text-xs tracking-[0.2em] uppercase hover:bg-[#333] transition-colors active:scale-95">
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
        <div className={`grid grid-cols-1 ${properties && properties.length > 1 ? 'md:grid-cols-2' : 'max-w-5xl mx-auto w-full'} gap-8`}>
          {properties?.map((prop, i) => (
            <PropertySlideshow key={prop.slug || i} prop={prop} t={t} langState={langState} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111] text-white py-20 px-6 text-center">
        <div className="font-montserrat text-sm tracking-[0.3em] uppercase font-light mb-8">
          {siteConfig?.site_title || "Grupo Zakher"}
        </div>
        <p className="font-montserrat text-xs tracking-widest text-gray-500 uppercase">
          &copy; {new Date().getFullYear()} {siteConfig?.site_title || "Grupo Zakher"}. {t.rights}
        </p>
      </footer>

      {/* Sticky Floating Booking Bar */}
      <AnimatePresence>
        {false && showSticky && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl bg-white/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-full border border-white/60 p-2 items-center justify-between"
          >
            <div className="hidden md:flex items-center gap-10 px-8">
              <div className="flex flex-col text-left">
                <span className="font-montserrat text-xs text-gray-500 uppercase tracking-widest mb-0.5">Check-in - Check-out</span>
                <span className="font-cormorant text-xl text-gray-900 leading-none">Select dates</span>
              </div>
              <div className="w-[1px] h-8 bg-gray-300"></div>
              <div className="flex flex-col text-left">
                <span className="font-montserrat text-xs text-gray-500 uppercase tracking-widest mb-0.5">Guests</span>
                <span className="font-cormorant text-xl text-gray-900 leading-none">2 Adults</span>
              </div>
            </div>
            <div className="flex-1 md:hidden px-6 text-left">
              <span className="font-cormorant text-xl text-gray-900 leading-none">{siteConfig?.site_title || "Grupo Zakher"}</span>
            </div>
            <button onClick={() => { setDrawerTab('reserve'); setIsDrawerOpen(true); }} className="bg-[#1A1A1A] text-white px-8 py-4 rounded-full font-montserrat text-xs tracking-[0.2em] uppercase hover:bg-[#333] transition-colors whitespace-nowrap active:scale-95">
              Check Availability
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Drawer - 60/40 Split */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-[40%] bg-black/85 backdrop-blur-3xl z-50 p-8 md:p-12 text-white shadow-[-20px_0_50px_rgba(0,0,0,0.5)] border-l border-white/5 overflow-y-auto"
            >
              <button onClick={() => setIsDrawerOpen(false)} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors duration-300"><X size={28} strokeWidth={1} /></button>
              
              {/* Concierge Segmented Control */}
              <div className="hidden bg-white/5 rounded-full p-1 mb-10 w-fit">
                <button 
                  onClick={() => setDrawerTab('reserve')}
                  className={`px-8 py-2 rounded-full text-[10px] font-montserrat tracking-[0.2em] uppercase transition-all duration-300 ${drawerTab === 'reserve' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:text-white'}`}
                >
                  {t.reserve}
                </button>
                <button 
                  onClick={() => setDrawerTab('contact')}
                  className={`px-8 py-2 rounded-full text-[10px] font-montserrat tracking-[0.2em] uppercase transition-all duration-300 ${drawerTab === 'contact' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:text-white'}`}
                >
                  {t.nav.contact}
                </button>
              </div>

              <h2 className="text-4xl font-cormorant font-light mb-2 tracking-wide">
                {drawerTab === 'reserve' ? "Book Your Stay" : (t.contactForm?.title || "Contact Concierge")}
              </h2>
              <p className="text-gray-400 font-montserrat text-xs tracking-wide mb-12">
                {drawerTab === 'reserve' ? "Select your dates to check availability." : (t.contactForm?.subtitle || "How can we assist with your stay?")}
              </p>

              {/* Reserve Tab Content */}
              {drawerTab === 'reserve' && (
                <div className="space-y-8 font-montserrat animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
                    <p className="text-xs tracking-widest text-gray-500 uppercase mb-4">Dates</p>
                    <input type="text" placeholder="Check In - Check Out" className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:outline-none focus:border-white transition-colors" />
                  </div>
                  <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
                    <p className="text-xs tracking-widest text-gray-500 uppercase mb-4">Guests</p>
                    <select defaultValue="2 Guests" className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer">
                      <option className="bg-[#1A1A1A]">1 Guest</option>
                      <option className="bg-[#1A1A1A]" value="2 Guests">2 Guests</option>
                      <option className="bg-[#1A1A1A]">3 Guests</option>
                      <option className="bg-[#1A1A1A]">4+ Guests</option>
                    </select>
                  </div>
                  <div className="pt-4">
                    <button className="w-full bg-white text-black py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-transparent hover:text-white border border-white transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] relative overflow-hidden group">
                      <span className="relative z-10 group-hover:tracking-[0.4em] transition-all duration-500">Check Availability</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Contact Tab Content */}
              {drawerTab === 'contact' && (
                <form 
                  onSubmit={(e) => { e.preventDefault(); alert(t.contactForm?.success || "Thanks for your inquiry. A concierge will be in touch shortly."); setIsDrawerOpen(false); }} 
                  className="space-y-8 font-montserrat animate-in fade-in slide-in-from-left-4 duration-500"
                >
                  {/* Inquiry Type Radios */}
                  <div className="flex gap-4">
                    <label className="flex flex-1 items-center gap-3 cursor-pointer group border border-white/10 rounded-xl p-4 bg-white/5 hover:bg-white/10 transition-colors">
                      <input type="radio" name="inquiryType" value="reservation" checked={inquiryType === 'reservation'} onChange={(e) => setInquiryType(e.target.value)} className="peer sr-only" />
                      <div className="w-3 h-3 rounded-full border border-gray-500 peer-checked:border-white peer-checked:bg-white transition-all"></div>
                      <span className="text-gray-400 text-[9px] md:text-[10px] tracking-[0.2em] uppercase peer-checked:text-white transition-colors">Reservation</span>
                    </label>
                    <label className="flex flex-1 items-center gap-3 cursor-pointer group border border-white/10 rounded-xl p-4 bg-white/5 hover:bg-white/10 transition-colors">
                      <input type="radio" name="inquiryType" value="questions" checked={inquiryType === 'questions'} onChange={(e) => setInquiryType(e.target.value)} className="peer sr-only" />
                      <div className="w-3 h-3 rounded-full border border-gray-500 peer-checked:border-white peer-checked:bg-white transition-all"></div>
                      <span className="text-gray-400 text-[9px] md:text-[10px] tracking-[0.2em] uppercase peer-checked:text-white transition-colors">Questions</span>
                    </label>
                  </div>

                  {inquiryType === 'reservation' && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-2">
                      <div className="flex gap-6">
                        <div className="flex-1 relative">
                          <span className="absolute -top-4 left-0 text-[9px] uppercase tracking-widest text-gray-500">Check In</span>
                          <input type="date" className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:outline-none focus:border-gray-400 focus:shadow-[0_1px_0_rgba(156,163,175,0.4)] transition-all duration-300 [color-scheme:dark] cursor-pointer" />
                        </div>
                        <div className="flex-1 relative">
                          <span className="absolute -top-4 left-0 text-[9px] uppercase tracking-widest text-gray-500">Check Out</span>
                          <input type="date" className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:outline-none focus:border-gray-400 focus:shadow-[0_1px_0_rgba(156,163,175,0.4)] transition-all duration-300 [color-scheme:dark] cursor-pointer" />
                        </div>
                      </div>
                      <div className="relative">
                        <select defaultValue="" className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:outline-none focus:border-gray-400 focus:shadow-[0_1px_0_rgba(156,163,175,0.4)] transition-all duration-300 appearance-none cursor-pointer">
                          <option value="" disabled className="text-gray-500">Number of Guests</option>
                          <option value="1" className="bg-[#1A1A1A] text-white">1 Guest</option>
                          <option value="2" className="bg-[#1A1A1A] text-white">2 Guests</option>
                          <option value="3" className="bg-[#1A1A1A] text-white">3+ Guests</option>
                          <option value="villa" className="bg-[#1A1A1A] text-white">Entire Villa (Buyout)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 pb-2">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <input required type="text" placeholder={t.contactForm?.name || "Full Name *"} className="w-full bg-transparent border-b border-gray-700 text-white placeholder:text-gray-500 pb-3 focus:outline-none focus:border-gray-400 focus:shadow-[0_1px_0_rgba(156,163,175,0.4)] transition-all duration-300" />
                  <input required type="email" placeholder={t.contactForm?.email || "Email Address *"} className="w-full bg-transparent border-b border-gray-700 text-white placeholder:text-gray-500 pb-3 focus:outline-none focus:border-gray-400 focus:shadow-[0_1px_0_rgba(156,163,175,0.4)] transition-all duration-300" />
                  <input required type="tel" placeholder={t.contactForm?.phone || "WhatsApp / Phone *"} className="w-full bg-transparent border-b border-gray-700 text-white placeholder:text-gray-500 pb-3 focus:outline-none focus:border-gray-400 focus:shadow-[0_1px_0_rgba(156,163,175,0.4)] transition-all duration-300" />
                  <div className="relative">
                    <select value={contactLang} onChange={(e) => setContactLang(e.target.value)} className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:outline-none focus:border-gray-400 focus:shadow-[0_1px_0_rgba(156,163,175,0.4)] transition-all duration-300 appearance-none cursor-pointer">
                      <option value="" disabled className="text-gray-500">{t.contactForm?.language || "Preferred Language (Optional)"}</option>
                      <option value="en" className="bg-[#1A1A1A] text-white">English</option>
                      <option value="es" className="bg-[#1A1A1A] text-white">Español</option>
                      <option value="pt" className="bg-[#1A1A1A] text-white">Português</option>
                      <option value="fr" className="bg-[#1A1A1A] text-white">Français</option>
                      <option value="other" className="bg-[#1A1A1A] text-white">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 pb-2">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                  {contactLang === 'other' && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                      <input type="text" placeholder={t.contactForm?.specifyLanguage || "Please specify language"} className="w-full bg-transparent border-b border-gray-700 text-white placeholder:text-gray-500 pb-3 focus:outline-none focus:border-gray-400 focus:shadow-[0_1px_0_rgba(156,163,175,0.4)] transition-all duration-300" />
                    </motion.div>
                  )}
                  <textarea required placeholder={t.contactForm?.requests || "Message/Special Requests *"} rows={3} className="w-full bg-transparent border-b border-gray-700 text-white placeholder:text-gray-500 pb-3 focus:outline-none focus:border-gray-400 focus:shadow-[0_1px_0_rgba(156,163,175,0.4)] transition-all duration-300 resize-none"></textarea>
                  
                  <div className="pt-4">
                    <button type="submit" className="w-full bg-white text-black py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-transparent hover:text-white border border-white transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] relative overflow-hidden group">
                      <span className="relative z-10 group-hover:tracking-[0.4em] transition-all duration-500">{t.contactForm?.send || "Send Message"}</span>
                    </button>
                    <p className="mt-6 text-center text-[9px] font-montserrat text-gray-500/70 tracking-widest uppercase">
                      * {t.contactForm?.mandatory || "Indicates a mandatory field"}
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
