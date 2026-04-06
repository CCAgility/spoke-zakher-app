import React from 'react';
import { motion } from 'motion/react';
import { Wind, Droplets, Sun, Leaf } from 'lucide-react';

const translations = {
  en: {
    nav: { villa: "The Villa", experiences: "Experiences" },
    reserve: "Reserve",
    location: "Cartagena de Indias",
    heroTitle: "San Pedro",
    heroSubtitle: "A seven-bedroom colonial sanctuary where historic elegance meets tropical tranquility.",
    oasisTitle: "A Tropical Oasis",
    architectureTitle: "Colonial Architecture",
    architectureDesc: "Step through our ancient doors into a world of lush courtyards, grand archways, and serene water features. Every corner of Casa Estrella is designed to bring you closer to nature while wrapping you in luxury.",
    discover: "Discover the Design",
    features: [
      { title: "Private Pools" },
      { title: "Rooftop Terrace" },
      { title: "Open Air Living" },
      { title: "Lush Courtyards" }
    ]
  },
  es: {
    nav: { villa: "La Villa", experiences: "Experiencias" },
    reserve: "Reservar",
    location: "Cartagena de Indias",
    heroTitle: "San Pedro",
    heroSubtitle: "Un santuario colonial de siete habitaciones donde la elegancia histÃ³rica se encuentra con la tranquilidad tropical.",
    oasisTitle: "Un Oasis Tropical",
    architectureTitle: "Arquitectura Colonial",
    architectureDesc: "Atraviese nuestras antiguas puertas hacia un mundo de exuberantes patios, grandes arcos y serenas fuentes de agua. Cada rincÃ³n de Casa Estrella estÃ¡ diseÃ±ado para acercarlo a la naturaleza mientras lo envuelve en lujo.",
    discover: "Descubrir el DiseÃ±o",
    features: [
      { title: "Piscinas Privadas" },
      { title: "Terraza en la Azotea" },
      { title: "Vida al Aire Libre" },
      { title: "Patios Exuberantes" }
    ]
  }
};

export function BalinesiaTheme({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-[#EAE6DF] text-[#2D3A30] font-serif selection:bg-[#4A5D4E] selection:text-[#EAE6DF]">
      {/* Header */}
      <header className="absolute top-0 w-full p-8 flex justify-between items-center z-40 text-white">
        <div className="font-serif text-2xl tracking-widest uppercase">Casa Estrella</div>
        <div className="flex items-center gap-8">
          <span className="hidden md:block text-sm tracking-widest uppercase font-sans">{t.nav.villa}</span>
          <span className="hidden md:block text-sm tracking-widest uppercase font-sans">{t.nav.experiences}</span>
          <button className="bg-white/10 backdrop-blur-md border border-white/30 px-6 py-2 rounded-full text-sm tracking-widest uppercase font-sans hover:bg-white hover:text-[#2D3A30] transition-colors">
            {t.reserve}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-swimming-pool-in-a-luxury-villa-4181-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#EAE6DF]"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <p className="text-white/80 font-sans tracking-[0.4em] uppercase text-sm mb-6">{t.location}</p>
            <h1 className="text-6xl md:text-8xl lg:text-9xl text-white font-light tracking-tight mb-8">
              {t.heroTitle}
            </h1>
            <p className="text-white/90 font-sans font-light text-lg max-w-xl mx-auto">
              {t.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light mb-6">{t.oasisTitle}</h2>
          <div className="w-px h-16 bg-[#4A5D4E] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div className="order-2 md:order-1">
            <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0644-m5KM1LpyNxsxzl9b.jpeg" alt="Villa" className="w-full h-[80vh] object-cover rounded-t-full" referrerPolicy="no-referrer" />
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <h3 className="text-3xl font-light">{t.architectureTitle}</h3>
            <p className="font-sans font-light text-[#5A6B5D] leading-relaxed text-lg">
              {t.architectureDesc}
            </p>
            <button className="font-sans tracking-widest uppercase text-sm border-b border-[#2D3A30] pb-1 hover:text-[#4A5D4E] hover:border-[#4A5D4E] transition-colors">
              {t.discover}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-t border-[#4A5D4E]/20 pt-16">
          {[
            { icon: <Droplets size={32} strokeWidth={1} />, title: t.features[0].title },
            { icon: <Sun size={32} strokeWidth={1} />, title: t.features[1].title },
            { icon: <Wind size={32} strokeWidth={1} />, title: t.features[2].title },
            { icon: <Leaf size={32} strokeWidth={1} />, title: t.features[3].title }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              <div className="text-[#4A5D4E]">{item.icon}</div>
              <h4 className="font-sans tracking-widest uppercase text-xs">{item.title}</h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}