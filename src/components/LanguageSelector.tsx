'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Globe } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export function LanguageSelector() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Phase 1: Initial 10s auto-hide
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Top of page overrides everything
      if (currentScrollY < 50) {
        setIsVisible(true);
      } 
      // Scrolling up reveals it
      else if (currentScrollY < lastScrollY.current - 5) {
        setIsVisible(true);
      } 
      // Scrolling down hides it
      else if (currentScrollY > lastScrollY.current + 5) {
        setIsVisible(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const pathname = usePathname();
  const router = useRouter();

  // Extract current lang from segment like '/en' or '/es/property/slug'
  const segments = typeof pathname === 'string' ? pathname.split('/') : [];
  const currentLang = segments[1] || 'en';

  const switchLang = (newLang: string) => {
    if (!pathname) return;
    const newSegments = [...segments];
    newSegments[1] = newLang; // swap the locale prefix
    router.push(newSegments.join('/') || '/');
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' },
    { code: 'fr', label: 'Français' }
  ];

  return (
    <div className={`fixed top-20 right-4 md:top-28 md:right-6 scale-[0.85] md:scale-100 origin-top-right z-50 flex items-center gap-2 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-lg border border-gray-200/50 transition-all duration-500 ease-in-out ${isVisible ? 'opacity-40 hover:opacity-100 translate-x-0 focus-within:opacity-100' : 'opacity-0 translate-x-8 pointer-events-none'}`}>
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600">
        <Globe size={16} />
      </div>
      <div className="flex gap-1 pr-1">
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => switchLang(l.code)}
            className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all uppercase tracking-wider ${
              currentLang === l.code 
                ? "bg-[#C2A878] text-white shadow-md" 
                : "bg-transparent text-gray-600 hover:bg-gray-100"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
