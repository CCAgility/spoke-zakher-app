'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, ChevronRight, MapPin, Anchor, Wind, Sun, Check, X, Bed, Bath, Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ConciergeDrawer } from './ConciergeDrawer';
import { resolveHeroImage, resolveGalleryImage } from '@/lib/image-utils';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

const BLUR_PIXEL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8+h8AAqEBzX+j3WAAAAAASUVORK5CYII=";

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
      "Security 9 PM - 7 AM",
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
    roomDetails: {
      masterSuite: { title: "The Master Suite", desc: "A sanctuary of colonial elegance featuring soaring ceilings, a private en-suite bathroom, and exclusive terrace access. Restored with impeccable historical detail.", viewLayout: "View Layout" },
      juniorSuite: { title: "Junior Suite", desc: "Refined botanical comfort. This spacious suite offers an intimate retreat with curated artisanal furnishings and a lush, tranquil atmosphere.", explore: "Explore" },
      bedroomDefault: { desc: "A meticulous double bedroom designed with shared luxury in mind. Perfect for families, blending authentic aesthetics with modern comforts." },
      bedroomPrefix: "Bedroom",
      amenities: { kingBed: "King Bed", doubleBed: "Double Bed", privateBath: "Private Bath", sharedBath: "Private/Shared Bath", ac: "Filtered A/C", airCon: "Air Conditioning", guests: "2 Guests" }
    },
    discover: "Explore",
    galleryTitle: "The Villa",
    drawer: { bookYourStay: "Book Your Stay", selectDates: "Select your dates to check availability.", dates: "Dates", checkInCheckOut: "Check In - Check Out", guests: "Guests", oneGuest: "1 Guest", twoGuests: "2 Guests", threeGuests: "3 Guests", fourPlusGuests: "4+ Guests", checkAvailability: "Check Availability", reservation: "Reservation", questions: "Questions", checkIn: "Check In", checkOut: "Check Out", numberOfGuests: "Number of Guests", entireVilla: "Entire Villa (Buyout)", threePlusGuests: "3+ Guests" },
    villaRentalInfo: { title: "Villa Rental Information", description: "is offered exclusively as a completely private villa rental. This historic sanctuary accommodates a maximum of", guests: "guests", standardRate: "Standard Rate", holidayPremium: "Holiday Premium", perNight: "/ night", button: "SPEAK WITH YOUR CONCIERGE", footnote: "Private itineraries and bespoke scheduling." },
    propertyLayout: { subtitle: "Floor Plan & Configuration", title: "Private Villa Layout", bedrooms: "7 Luxury Bedrooms" }
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
      "Seguridad 9 PM - 7 AM",
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
    roomDetails: {
      masterSuite: { title: "La Suite Principal", desc: "Un santuario de elegancia colonial con techos altos, baño privado en suite y acceso exclusivo a la terraza. Restaurado con impecable detalle histórico.", viewLayout: "Ver Plano" },
      juniorSuite: { title: "Suite Junior", desc: "Confort botánico refinado. Esta espaciosa suite ofrece un refugio íntimo con muebles artesanales seleccionados y un ambiente exuberante y tranquilo.", explore: "Explorar" },
      bedroomDefault: { desc: "Un meticuloso dormitorio doble diseñado pensando en el lujo compartido. Perfecto para familias, combinando una estética auténtica con las comodidades modernas." },
      bedroomPrefix: "Habitación",
      amenities: { kingBed: "Cama King", doubleBed: "Cama Doble", privateBath: "Baño Privado", sharedBath: "Baño Privado/Compartido", ac: "Aire Acondicionado", airCon: "Aire Acondicionado", guests: "2 Huéspedes" }
    },
    discover: "Explorar",
    galleryTitle: "La Villa",
    drawer: { bookYourStay: "Reserve su Estancia", selectDates: "Seleccione sus fechas para ver disponibilidad.", dates: "Fechas", checkInCheckOut: "Llegada - Salida", guests: "Huéspedes", oneGuest: "1 Huésped", twoGuests: "2 Huéspedes", threeGuests: "3 Huéspedes", fourPlusGuests: "4+ Huéspedes", checkAvailability: "Ver Disponibilidad", reservation: "Reserva", questions: "Preguntas", checkIn: "Llegada", checkOut: "Salida", numberOfGuests: "Número de Huéspedes", entireVilla: "Villa Entera", threePlusGuests: "3+ Huéspedes" },
    villaRentalInfo: { title: "Información de Alquiler", description: "se ofrece exclusivamente como un alquiler de villa completamente privado. Este santuario histórico tiene capacidad para un máximo de", guests: "huéspedes", standardRate: "Tarifa Estándar", holidayPremium: "Tarifa Vacacional", perNight: "/ noche", button: "HABLE CON SU CONSERJE", footnote: "Itinerarios privados y reservas a medida." },
    propertyLayout: { subtitle: "Plano y Configuración", title: "Distribución de la Villa Privada", bedrooms: "7 Habitaciones de Lujo" }
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
    welcomeText: "Descubra um santuário onde a história e o luxo se entrelaçam. A Casa Estrella oferece sete quartos requintados, piscinas privativas e pátios exuberantes, proporcionando um refúgio inigualável em Cartagena. Cada detalhe foi cuidadosamente selecionado para garantir que a sua estadia seja nada menos que extraordinária.",
    aboutTitle: "Sobre a casa",
    amenitiesTitle: "Comodidades",
    amenitiesList: [
      "Piscina e Mini Piscina",
      "Bar na Cobertura",
      "Mesa de Jantar ao Ar Livre",
      "Segurança 9 PM - 7 AM",
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
    roomDetails: {
      masterSuite: { title: "A Suíte Master", desc: "Um santuário de elegância colonial com tetos altos, banheiro privativo e acesso exclusivo ao terraço. Restaurado com detalhes históricos impecáveis.", viewLayout: "Ver Layout" },
      juniorSuite: { title: "Suíte Júnior", desc: "Conforto botânico refinado. Esta suíte espaçosa oferece um retiro íntimo com móveis artesanais selecionados e uma atmosfera exuberante e tranquila.", explore: "Explorar" },
      bedroomDefault: { desc: "Um quarto duplo meticuloso projetado com luxo compartilhado em mente. Perfeito para famílias, combinando uma estética autêntica com conveniências modernas." },
      bedroomPrefix: "Quarto",
      amenities: { kingBed: "Cama King", doubleBed: "Cama de Casal", privateBath: "Banheiro Privado", sharedBath: "Banheiro Privado/Compartilhado", ac: "Ar Condicionado", airCon: "Ar Condicionado", guests: "2 Hóspedes" }
    },
    discover: "Explorar",
    galleryTitle: "A Villa",
    drawer: { bookYourStay: "Reserve sua Estadia", selectDates: "Selecione suas datas para verificar disponibilidade.", dates: "Datas", checkInCheckOut: "Check-in - Check-out", guests: "Hóspedes", oneGuest: "1 Hóspede", twoGuests: "2 Hóspedes", threeGuests: "3 Hóspedes", fourPlusGuests: "4+ Hóspedes", checkAvailability: "Verificar Disponibilidade", reservation: "Reserva", questions: "Perguntas", checkIn: "Check-in", checkOut: "Check-out", numberOfGuests: "Número de Hóspedes", entireVilla: "Villa Inteira", threePlusGuests: "3+ Hóspedes" },
    villaRentalInfo: { title: "Informações de Aluguel", description: "é oferecida exclusivamente como um aluguel de villa completamente privado. Este santuário histórico acomoda um máximo de", guests: "hóspedes", standardRate: "Tarifa Padrão", holidayPremium: "Tarifa Feriados", perNight: "/ noite", button: "FALE COM SEU CONCIERGE", footnote: "Itinerários privados e agendamento sob medida." },
    propertyLayout: { subtitle: "Planta e Configuração", title: "Layout da Villa Privativa", bedrooms: "7 Quartos de Luxo" }
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
    welcomeText: "Découvrez un sanctuaire où l'histoire et le luxe s'entrelacent. Casa Estrella offre sept chambres exquises, des piscines privées et des cours luxuriantes, offrant une retraite sans pareille à Carthagène. Chaque détail a été soigneusement sélectionné pour garantir que votre séjour soit tout simplement extraordinaire.",
    aboutTitle: "À propos de la maison",
    amenitiesTitle: "Commodités",
    amenitiesList: [
      "Piscine et Mini Piscine",
      "Lounge sur le Toit",
      "Table à Manger Extérieure",
      "Sécurité de 21h à 7h",
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
    roomDetails: {
      masterSuite: { title: "La Suite Master", desc: "Un sanctuaire d'élégance coloniale avec de hauts plafonds, une salle de bain privée et un accès exclusif à la terrasse. Restauré avec un détail historique impeccable.", viewLayout: "Voir Plan" },
      juniorSuite: { title: "Suite Junior", desc: "Confort botanique raffiné. Cette suite spacieuse offre une retraite intime avec des meubles artisanaux sélectionnés et une atmosphère luxuriante et tranquille.", explore: "Découvrir" },
      bedroomDefault: { desc: "Une chambre double méticuleuse conçue pour un luxe partagé. Parfaite pour les familles, alliant une esthétique authentique aux conforts modernes." },
      bedroomPrefix: "Chambre",
      amenities: { kingBed: "Lit King", doubleBed: "Lit Double", privateBath: "Salle de Bain Privée", sharedBath: "Salle de Bain Privée/Partagée", ac: "Climatisation", airCon: "Climatisation", guests: "2 Invités" }
    },
    discover: "Explorer",
    galleryTitle: "La Villa",
    drawer: { bookYourStay: "Réserver votre Séjour", selectDates: "Sélectionnez vos dates pour vérifier la disponibilité.", dates: "Dates", checkInCheckOut: "Arrivée - Départ", guests: "Voyageurs", oneGuest: "1 Voyageur", twoGuests: "2 Voyageurs", threeGuests: "3 Voyageurs", fourPlusGuests: "4+ Voyageurs", checkAvailability: "Vérifier la Disponibilité", reservation: "Réservation", questions: "Questions", checkIn: "Arrivée", checkOut: "Départ", numberOfGuests: "Nombre de Voyageurs", entireVilla: "Villa Entière", threePlusGuests: "3+ Voyageurs" },
    villaRentalInfo: { title: "Informations de Location", description: "est proposée exclusivement comme une location de villa entièrement privée. Ce sanctuaire historique peut accueillir un maximum de", guests: "personnes", standardRate: "Tarif Standard", holidayPremium: "Tarif Premium", perNight: "/ nuit", button: "CONTACTEZ VOTRE CONCIERGERIE", footnote: "Itinéraires privés et organisation sur mesure." },
    propertyLayout: { subtitle: "Plan et Configuration", title: "Aménagement de la Villa Privée", bedrooms: "7 Chambres de Luxe" }
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

  // Resolver: Prevent root English CMS strings from contaminating translated pages if no CMS translation row exists.
  const getLocStr = (field: string, localFallback: any) => {
    const tr = property?.translations?.find((x: any) => x.languages_code === lang || x.languages_code?.startsWith(lang));
    if (tr && tr[field]) return tr[field];
    if (lang === 'en' && property && property[field]) return property[field];
    return localFallback;
  };
  const [showSticky, setShowSticky] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<'contact'|'reserve'>('reserve');
  const [activeRoom, setActiveRoom] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const container = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo('.hero-bg', { scale: 1.05 }, { scale: 1, duration: 6 });
    tl.fromTo('.split-word', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 }, "-=5.0");
    tl.fromTo('.hero-nav', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 }, "-=4.0");
  }, { scope: container });

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveRoom(null);
        setIsDrawerOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const guestBedrooms = [
    { title: 'Bedroom 1', img: '/gallery/casa-estrella/casa-estrella-double-room-1.jpeg', gallery: ['/gallery/casa-estrella/casa-estrella-double-room-1.jpeg', '/gallery/casa-estrella/casa-estrella-bedroom.webp', '/gallery/casa-estrella/6.webp', '/gallery/casa-estrella/9.webp'] },
    { title: 'Bedroom 2', img: '/gallery/casa-estrella/casa-estrella-double-room-2-1.jpeg', gallery: ['/gallery/casa-estrella/casa-estrella-double-room-2-1.jpeg', '/gallery/casa-estrella/casa-estrella-double-room-2-2.jpeg', '/gallery/casa-estrella/casa-estrella-double-room-2-3.jpeg', '/gallery/casa-estrella/casa-estrella-double-room-2-4.jpeg', '/gallery/casa-estrella/casa-estrella-double-room-2.jpg'] },
    { title: 'Bedroom 3', img: '/gallery/casa-estrella/casa-estrella-double-room-3-1.jpeg', gallery: ['/gallery/casa-estrella/casa-estrella-double-room-3-1.jpeg', '/gallery/casa-estrella/casa-estrella-double-room-3-2.jpeg', '/gallery/casa-estrella/casa-estrella-double-room-3-3.jpg', '/gallery/casa-estrella/casa-estrella-double-room-3-4.jpg', '/gallery/casa-estrella/casa-estrella-double-room-3.jpg'] },
    { title: 'Bedroom 4', img: '/gallery/casa-estrella/casa-estrella-double-room-4-1.jpeg', gallery: ['/gallery/casa-estrella/casa-estrella-double-room-4-1.jpeg', '/gallery/casa-estrella/casa-estrella-double-room-4-2.jpeg', '/gallery/casa-estrella/casa-estrella-double-room-4-3.jpeg', '/gallery/casa-estrella/casa-estrella-double-room-4-4.jpeg', '/gallery/casa-estrella/casa-estrella-double-room-4-5.jpeg', '/gallery/casa-estrella/casa-estrella-double-room-4.jpg'] },
    { title: 'Bedroom 5', img: '/gallery/casa-estrella/casa-estrella-double-room-5-1.jpeg', gallery: ['/gallery/casa-estrella/casa-estrella-double-room-5-1.jpeg', '/gallery/casa-estrella/casa-estrella-double-room-5-2.jpeg', '/gallery/casa-estrella/casa-estrella-double-room-5-3.jpeg', '/gallery/casa-estrella/casa-estrella-double-room-5-4.jpeg'] }
  ];

  return (
    <div ref={container} className="min-h-screen bg-[#F9F9F9] text-[#1A1A1A] font-sans selection:bg-[#8BA3A0] selection:text-white">
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
            <div className="w-auto flex-shrink-0 break-words pr-4">
              <Link href={`/${lang}`} className="font-montserrat text-sm tracking-[0.3em] uppercase font-medium hover:opacity-70 transition-colors block truncate">
                {siteConfig?.site_title || "Grupo Zakher"}
              </Link>
            </div>
            <nav className="hidden md:flex gap-4 lg:gap-10 font-montserrat text-xs tracking-[0.2em] uppercase font-medium">
          <Link href={`/${lang}`} className="p-3 min-h-[44px] flex items-center hover:opacity-70 transition-opacity uppercase active:scale-95">{t.nav.home}</Link>
          
          <div className="relative group focus-within:opacity-100">
            <button className="p-3 min-h-[44px] min-w-[44px] hover:opacity-70 transition-opacity flex items-center justify-center gap-2 uppercase active:scale-95">
              {t.nav.property} <span className="text-xs opacity-70">▼</span>
            </button>
            <div className={`absolute top-full left-0 mt-[1px] border-t-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition-all duration-300 transform origin-top scale-y-0 group-hover:scale-y-100 min-w-[220px] shadow-2xl py-2 ${showSticky ? 'bg-white/60 backdrop-blur-2xl border border-white/40 text-[#1A1A1A]' : 'bg-[#1A1A1A]/60 backdrop-blur-md border border-white/10 text-white'}`}>
              <div className="absolute top-0 left-0 h-[2px] bg-[#D4AF37] w-0 group-hover:w-full transition-all duration-500 ease-in-out" />
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                <Link href={`/${lang}/property/${property?.slug || 'casa-estrella'}`} className={`block px-6 py-4 text-xs tracking-widest uppercase transition-colors min-h-[44px] flex items-center ${showSticky ? 'hover:bg-gray-100 opacity-80 hover:opacity-100' : 'hover:bg-white/10 opacity-90 hover:opacity-100'}`}>
                  {property?.title || t.nav.casaEstrella}
                </Link>
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
                <Link href={`/${lang}/property/${property?.slug || 'casa-estrella'}`} onClick={() => setIsMobileMenuOpen(false)} className="font-cormorant text-4xl drop-shadow-md hover:opacity-70 transition-opacity uppercase">
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
        <div className="absolute inset-0 z-0 pointer-events-none hero-bg origin-center bg-cover" style={{ backgroundImage: `url(${resolveHeroImage(property)})`, backgroundPosition: 'center center' }}>
          <div className="absolute inset-0 bg-[#1A1A1A]/10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-white max-w-4xl">
          <div>
            <button onClick={() => setIsMapOpen(true)} className="hero-nav flex items-center gap-3 mb-6 font-montserrat text-xs tracking-[0.2em] uppercase text-white/80 hover:text-white transition-colors group cursor-pointer">
              <MapPin size={14} className="group-hover:scale-110 transition-transform" />
              <span className="border-b border-transparent group-hover:border-white/50 transition-colors pb-1">{property?.location || "Cartagena, Colombia"}</span>
            </button>
            <h1 className="font-cormorant text-6xl md:text-8xl lg:text-9xl font-light leading-none mb-6 drop-shadow-lg">
              {getLocStr('title', t.nav.casaEstrella).split(' ').map((word: string, i: number) => (
                <span key={i} className="inline-block overflow-hidden mr-4 last:mr-0 align-bottom">
                  <span className="split-word block transform-gpu leading-none">
                    {word}
                  </span>
                </span>
              ))}
            </h1>
            <p className="hero-nav font-montserrat text-sm md:text-base font-light max-w-xl leading-relaxed text-white/90">
              {getLocStr('description', t.heroSubtitle)}
            </p>
          </div>
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
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7 xl:col-span-8">
            <h2 className="font-cormorant text-4xl md:text-5xl text-[#1A1A1A] mb-8 font-medium">{t.aboutTitle}</h2>
            <p className="font-montserrat text-gray-500 leading-relaxed text-base font-light">
              {getLocStr('about_description', t.welcomeText) || getLocStr('description', t.welcomeText)}
            </p>
          </div>

          <div className="lg:col-span-5 xl:col-span-4">
            <h2 className="font-cormorant text-4xl md:text-5xl text-[#1A1A1A] mb-8 font-medium">{t.amenitiesTitle}</h2>
            <div className="grid grid-cols-1 gap-y-2">
              {t.amenitiesList.map((amenity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check size={15} className="text-orange-500 flex-shrink-0 mt-[4px]" strokeWidth={2} />
                  <span className="font-montserrat text-gray-500 font-light text-[15px] leading-relaxed">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property Layout & Rates Module */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-left">
            <span className="font-montserrat text-xs tracking-[0.3em] uppercase text-gray-500 mb-4 block">{t.propertyLayout.subtitle}</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-black">{t.propertyLayout.title}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Rooms List */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              <h3 className="font-montserrat text-xs tracking-[0.2em] uppercase text-black mb-8 border-b pb-4">{t.propertyLayout.bedrooms}</h3>
              
              <div className="bg-white p-3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-100/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {/* Master Suite Bento (Spans full width) */}
                <div className="col-span-1 sm:col-span-2 md:col-span-3 group relative h-[300px] md:h-[350px] overflow-hidden cursor-pointer" onClick={() => setActiveRoom({
                  title: t.roomDetails.masterSuite.title,
                  img: '/gallery/casa-estrella/casa-estrella-master-suite-1.jpeg',
                  gallery: ['/gallery/casa-estrella/casa-estrella-master-suite-1.jpeg', '/gallery/casa-estrella/casa-estrella-master-suite-2.jpeg', '/gallery/casa-estrella/casa-estrella-master-suite-3.jpeg', '/gallery/casa-estrella/casa-estrella-master-suite-4.jpeg', '/gallery/casa-estrella/casa-estrella-master-suite-5.jpeg'],
                  desc: t.roomDetails.masterSuite.desc,
                  amenities: [
                    { label: t.roomDetails.amenities.kingBed, icon: 'bed' },
                    { label: t.roomDetails.amenities.privateBath, icon: 'bath' },
                    { label: t.roomDetails.amenities.ac, icon: 'wind' },
                    { label: t.roomDetails.amenities.guests, icon: 'users' }
                  ]
                })}>
                  <Image src="/gallery/casa-estrella/casa-estrella-master-suite-1.jpeg" alt={t.roomDetails.masterSuite.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" placeholder="blur" blurDataURL={BLUR_PIXEL} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h4 className="font-cormorant text-3xl mb-1 drop-shadow-md">{t.roomDetails.masterSuite.title}</h4>
                    <span className="font-montserrat text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">{t.roomDetails.masterSuite.viewLayout} <ChevronRight size={14} /></span>
                  </div>
                </div>
                
                {/* Junior Suite Bento */}
                <div className="col-span-1 group relative h-[220px] overflow-hidden cursor-pointer" onClick={() => setActiveRoom({
                  title: t.roomDetails.juniorSuite.title,
                  img: '/gallery/casa-estrella/casa-estrella-junior-suite-3.jpeg',
                  gallery: ['/gallery/casa-estrella/casa-estrella-junior-suite-3.jpeg', '/gallery/casa-estrella/casa-estrella-junior-suite-1.jpeg', '/gallery/casa-estrella/casa-estrella-junior-suite-2.jpeg', '/gallery/casa-estrella/casa-estrella-junior-suite-4.jpg'],
                  desc: t.roomDetails.juniorSuite.desc,
                  amenities: [
                    { label: t.roomDetails.amenities.kingBed, icon: 'bed' },
                    { label: t.roomDetails.amenities.privateBath, icon: 'bath' },
                    { label: t.roomDetails.amenities.ac, icon: 'wind' },
                    { label: t.roomDetails.amenities.guests, icon: 'users' }
                  ]
                })}>
                  <Image src="/gallery/casa-estrella/casa-estrella-junior-suite-3.jpeg" alt={t.roomDetails.juniorSuite.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" placeholder="blur" blurDataURL={BLUR_PIXEL} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500" />
                  <div className="absolute bottom-5 left-5 text-white">
                    <h4 className="font-cormorant text-lg md:text-xl mb-1 drop-shadow-md leading-tight">{t.roomDetails.juniorSuite.title}</h4>
                    <span className="font-montserrat text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">{t.roomDetails.juniorSuite.explore}</span>
                  </div>
                </div>

                {guestBedrooms.map((room, i) => {
                  const roomNumber = parseInt(room.title.replace('Bedroom ', ''), 10);
                  const translatedRoomTitle = `${t.roomDetails.bedroomPrefix} ${roomNumber}`;
                  
                  return (
                  <div key={i} className="col-span-1 group relative h-[220px] overflow-hidden cursor-pointer" onClick={() => setActiveRoom({
                    title: translatedRoomTitle,
                    img: room.img,
                    gallery: room.gallery,
                    desc: t.roomDetails.bedroomDefault.desc,
                    amenities: [
                      { label: t.roomDetails.amenities.doubleBed, icon: 'bed' },
                      { label: t.roomDetails.amenities.sharedBath, icon: 'bath' },
                      { label: t.roomDetails.amenities.airCon, icon: 'wind' },
                      { label: t.roomDetails.amenities.guests, icon: 'users' }
                    ]
                  })}>
                    <Image src={room.img} alt={translatedRoomTitle} fill className="object-cover transition-transform duration-700 group-hover:scale-105" placeholder="blur" blurDataURL={BLUR_PIXEL} />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-colors duration-500" />
                    <div className="absolute bottom-5 left-5 text-white">
                      <h4 className="font-cormorant text-lg md:text-xl mb-1 drop-shadow-md leading-tight">{translatedRoomTitle}</h4>
                      <span className="font-montserrat text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">{t.roomDetails.juniorSuite.explore}</span>
                    </div>
                  </div>
                )})}
                </div>
              </div>
            </div>

            {/* Rental Rates & Details */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col h-fit lg:sticky lg:top-32 z-10">
              <h3 className="font-montserrat text-xs tracking-[0.2em] uppercase text-transparent mb-8 border-b border-transparent pb-4 select-none pointer-events-none hidden lg:block" aria-hidden="true">-</h3>
              <div className="bg-[#243F4D] text-white p-10 md:p-12 flex flex-col justify-between flex-1 shadow-[0_20px_50px_-10px_rgba(36,63,77,0.5)] hover:shadow-[0_30px_60px_-12px_rgba(36,63,77,0.7)] border border-white/5 relative transition-all duration-700">
              <div>
                <h3 className="font-cormorant text-3xl font-light mb-6">{t.villaRentalInfo.title}</h3>
                <p className="font-montserrat text-sm font-light leading-relaxed text-white/80 mb-8">
                  {getLocStr('title', t.nav.casaEstrella)} {t.villaRentalInfo.description} <strong className="text-white font-medium">{property?.max_guests || 16} {t.villaRentalInfo.guests}</strong>.
                </p>
              </div>
              
              <div className="flex flex-col gap-6 mt-6 md:mt-10">
                <div className="border border-white/20 p-6 flex flex-col gap-4">
                   <div className="flex justify-between items-center font-montserrat text-sm">
                     <span className="font-light text-white/70 uppercase tracking-widest text-xs">{t.villaRentalInfo.standardRate}</span>
                     <span>${property?.low_season_rate || "1,050"} <span className="text-[10px] text-white/50 uppercase tracking-widest">{t.villaRentalInfo.perNight}</span></span>
                   </div>
                   <div className="flex justify-between items-center font-montserrat text-sm">
                     <span className="font-light text-white/70 uppercase tracking-widest text-xs">{t.villaRentalInfo.holidayPremium}</span>
                     <span>${property?.high_season_rate || "1,995"} <span className="text-[10px] text-white/50 uppercase tracking-widest">{t.villaRentalInfo.perNight}</span></span>
                   </div>
                </div>
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes luxuryBreath {
                    0%, 100% { background-color: white; color: #1A1A1A; box-shadow: none; }
                    50% { background-color: #C2A878; color: white; box-shadow: 0 10px 30px rgba(194,168,120,0.5); }
                  }
                  .animate-luxury-breath {
                    animation: luxuryBreath 5s ease-in-out infinite;
                  }
                  .animate-luxury-breath:hover {
                    animation-play-state: paused;
                  }
                `}} />
                <button 
                  onClick={() => { setDrawerTab('contact'); setIsDrawerOpen(true); }}
                  className="group w-full py-4 font-montserrat text-sm tracking-[0.2em] uppercase transition-all duration-700 ease-out font-medium active:scale-[0.98] relative overflow-hidden animate-luxury-breath">
                  <span className="relative z-10">{t.villaRentalInfo.button}</span>
                  <div className="absolute top-0 bottom-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out z-0" />
                </button>
                <p className="text-center font-montserrat text-xs text-white/50 font-light mt-4">{t.villaRentalInfo.footnote}</p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="hidden py-32 bg-[#1A1A1A] text-white">
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
              const imgSrc = resolveGalleryImage(item, i);
              
              return (
              <div key={i} className={`relative group overflow-hidden ${i === 0 || i === 3 ? 'col-span-2 row-span-2 h-[400px]' : 'h-[192px]'}`}>
                <Image 
                  src={imgSrc} 
                  alt={`${getLocStr('title', t.nav.casaEstrella)} Gallery ${i}`}
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
      <footer className="bg-white border-t border-gray-200 text-[#1A1A1A] py-20 px-6 text-center">
        <div className="font-montserrat text-sm tracking-[0.3em] uppercase font-medium mb-8">
          {getLocStr('title', t.nav.casaEstrella)}
        </div>
        <p className="font-montserrat text-xs tracking-widest text-gray-400 uppercase">
          &copy; {new Date().getFullYear()} {siteConfig?.site_title || "Grupo Zakher"}. All rights reserved.
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

      {/* Room Modal (MVP D) */}
      <AnimatePresence>
        {activeRoom && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 md:p-6"
            onClick={() => setActiveRoom(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-[95vw] max-w-7xl bg-[#1A1A1A] border border-white/10 shadow-2xl flex flex-col md:flex-row overflow-hidden h-[90vh] md:h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Visual Suite Gallery: Scrollable Left/Top Pane */}
              <div className="relative w-full h-[40vh] min-h-[40vh] md:h-auto md:flex-1 bg-black overflow-x-auto md:overflow-x-hidden md:overflow-y-auto flex flex-row md:flex-col snap-x md:snap-y snap-mandatory cursor-ew-resize md:cursor-ns-resize flex-shrink-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style dangerouslySetInnerHTML={{__html: `::-webkit-scrollbar { display: none; }`}} />
                {(activeRoom.gallery || [activeRoom.img]).map((photo: string, i: number) => (
                  <div key={i} className="relative w-full h-full min-w-full md:min-w-0 md:min-h-full snap-start flex-shrink-0">
                    <Image src={photo} alt={`${activeRoom.title} View ${i + 1}`} fill className="object-cover" placeholder="blur" blurDataURL={BLUR_PIXEL} />
                  </div>
                ))}
                {activeRoom.gallery && activeRoom.gallery.length > 1 && (
                  <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 font-montserrat text-[10px] tracking-widest uppercase text-white rounded-full flex items-center gap-2 pointer-events-none">
                    <span className="md:hidden">Swipe for more</span>
                    <span className="hidden md:inline">Scroll for more</span>
                    <ChevronRight size={12} className="md:rotate-90 ml-1" />
                  </div>
                )}
              </div>

              {/* Structured Info Box: Right/Bottom Pane */}
              <div className="w-full md:w-[420px] flex-1 md:flex-none md:flex-shrink-0 p-6 md:p-10 flex flex-col justify-start md:justify-center bg-white relative overflow-y-auto">
                <button className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors bg-gray-50 p-2 rounded-full" onClick={() => setActiveRoom(null)}><X size={20} strokeWidth={1.5} /></button>
                
                <span className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-4 block">Casa Estrella de San Pedro</span>
                <h2 className="font-cormorant text-5xl text-black mb-6 leading-tight">{activeRoom.title}</h2>
                
                <p className="font-montserrat text-sm font-light leading-relaxed text-gray-600 mb-10">
                  {activeRoom.desc}
                </p>

                <div className="border-t border-b border-black/10 py-8 mb-10">
                   <h4 className="font-montserrat text-[10px] tracking-widest uppercase text-black mb-6">Room Features & Configuration</h4>
                   <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                      {(activeRoom.amenities || []).map((amenity: any, idx: number) => (
                         <div key={idx} className="flex items-center gap-3 font-montserrat text-xs text-gray-600">
                           {amenity.icon === 'bed' && <Bed size={16} strokeWidth={1.5} className="text-gray-400 flex-shrink-0" />}
                           {amenity.icon === 'bath' && <Bath size={16} strokeWidth={1.5} className="text-gray-400 flex-shrink-0" />}
                           {amenity.icon === 'wind' && <Wind size={16} strokeWidth={1.5} className="text-gray-400 flex-shrink-0" />}
                           {amenity.icon === 'users' && <Users size={16} strokeWidth={1.5} className="text-gray-400 flex-shrink-0" />}
                           {amenity.icon === 'sun' && <Sun size={16} strokeWidth={1.5} className="text-gray-400 flex-shrink-0" />}
                           {amenity.icon === 'anchor' && <Anchor size={16} strokeWidth={1.5} className="text-gray-400 flex-shrink-0" />}
                           {amenity.icon === 'map-pin' && <MapPin size={16} strokeWidth={1.5} className="text-gray-400 flex-shrink-0" />}
                           <span className="font-light leading-tight">{amenity.label}</span>
                         </div>
                      ))}
                   </div>
                </div>

                <button className="w-full bg-black text-white px-8 py-4 font-montserrat text-xs uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors active:scale-[0.98] duration-300" onClick={() => { setActiveRoom(null); setDrawerTab('reserve'); setIsDrawerOpen(true); }}>Speak with your Concierge</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                <span className="font-cormorant text-2xl md:text-3xl font-light">{property?.location || "Cartagena, Colombia"}</span>
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
