// @ts-nocheck — Legacy Vite component, not used by Next.js App Router
import React from 'react';
import { cn } from '../lib/utils';
import { Globe } from 'lucide-react';

export function LanguageSelector({ lang, setLang }: { lang: string, setLang: (l: string) => void }) {
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'EspaÃƒÂ±ol' },
    { code: 'pt', label: 'PortuguÃƒÂªs' },
    { code: 'fr', label: 'FranÃƒÂ§ais' }
  ];

  return (
    <div className="fixed top-28 right-6 z-50 flex items-center gap-2 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-lg border border-gray-200/50">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600">
        <Globe size={16} />
      </div>
      <div className="flex gap-1 pr-1">
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={cn(
              "px-3 py-1.5 text-xs font-bold rounded-full transition-all uppercase tracking-wider",
              lang === l.code 
                ? "bg-[#C2A878] text-white shadow-md" 
                : "bg-transparent text-gray-600 hover:bg-gray-100"
            )}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}