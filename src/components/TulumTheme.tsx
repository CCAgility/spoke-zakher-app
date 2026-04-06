import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Sun, Wind, Droplets } from 'lucide-react';

const translations = {
  en: {
    reserve: "Reserve",
    heroTitle: "Barefoot Luxury in the Walled City.",
    heroSubtitle: "A sanctuary of colonial architecture and modern tranquility.",
    rooftopTitle: "Rooftop Oasis",
    rooftopDesc: "Panoramic views of Cartagena's historic center.",
    experiencesTitle: "Curated Experiences",
    experiencesDesc: "Beyond our 7 luxurious bedrooms, Casa Estrella offers bespoke services designed to rejuvenate the soul. From on-site yoga to private gourmet dining, every detail is tailored to your rhythm.",
    amenities: [
      { title: "Yoga & Massage" },
      { title: "Private Pools" },
      { title: "Open Air Dining" },
      { title: "Rooftop Bar" }
    ]
  },
  es: {
    reserve: "Reservar",
    heroTitle: "Lujo Descalzo en la Ciudad Amurallada.",
    heroSubtitle: "Un santuario de arquitectura colonial y tranquilidad moderna.",
    rooftopTitle: "Oasis en la Azotea",
    rooftopDesc: "Vistas panorÃ¡micas del centro histÃ³rico de Cartagena.",
    experiencesTitle: "Experiencias Curadas",
    experiencesDesc: "MÃ¡s allÃ¡ de nuestras 7 lujosas habitaciones, Casa Estrella ofrece servicios a medida diseÃ±ados para rejuvenecer el alma. Desde yoga en el lugar hasta cenas gourmet privadas, cada detalle se adapta a su ritmo.",
    amenities: [
      { title: "Yoga y Masajes" },
      { title: "Piscinas Privadas" },
      { title: "Comedor al Aire Libre" },
      { title: "Bar en la Azotea" }
    ]
  }
};

export function TulumTheme({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#2C3B2E] font-sans selection:bg-[#8A9A86] selection:text-white">
      {/* Header */}
      <header className="fixed top-0 w-full p-6 flex justify-between items-center z-40 bg-[#F5F2EB]/90 backdrop-blur-sm">
        <div className="font-serif text-xl tracking-[0.2em] uppercase">Casa Estrella</div>
        <button className="text-xs font-medium tracking-[0.1em] uppercase border-b border-[#2C3B2E] pb-1 hover:text-[#8A9A86] hover:border-[#8A9A86] transition-colors">
          {t.reserve}
        </button>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="font-serif text-5xl md:text-7xl mb-6 text-[#2C3B2E] leading-tight">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-[#5C6B5E] font-light tracking-wide">
            {t.heroSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[70vh]">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}
            className="md:col-span-8 rounded-2xl overflow-hidden relative group"
          >
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-swimming-pool-in-a-luxury-villa-4181-large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[#2C3B2E]/10"></div>
          </motion.div>
          <div className="md:col-span-4 grid grid-rows-2 gap-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
              className="rounded-2xl overflow-hidden relative group"
            >
              <img 
                src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0644-m5KM1LpyNxsxzl9b.jpeg" 
                alt="Facade" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
              className="bg-[#EAE5D9] rounded-2xl p-8 flex flex-col justify-center items-center text-center"
            >
              <Sun className="text-[#8A9A86] mb-4" size={32} />
              <h3 className="font-serif text-2xl mb-2">{t.rooftopTitle}</h3>
              <p className="text-[#5C6B5E] text-sm">{t.rooftopDesc}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wellness & Amenities */}
      <section className="py-24 px-6 bg-[#2C3B2E] text-[#F5F2EB]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl mb-8">{t.experiencesTitle}</h2>
            <p className="text-[#A3B1A5] text-lg font-light leading-relaxed mb-12">
              {t.experiencesDesc}
            </p>
            <div className="grid grid-cols-2 gap-8">
              {[
                { icon: <Leaf />, title: t.amenities[0].title },
                { icon: <Droplets />, title: t.amenities[1].title },
                { icon: <Wind />, title: t.amenities[2].title },
                { icon: <Sun />, title: t.amenities[3].title }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="text-[#8A9A86]">{item.icon}</div>
                  <span className="font-medium tracking-wide">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-t-full overflow-hidden aspect-[3/4]">
            <img 
              src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0389-mp8WRqw9M5T49WDb.jpeg" 
              alt="Living Area" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </div>
  );
}