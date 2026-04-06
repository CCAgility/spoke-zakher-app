// @ts-nocheck — Legacy Vite component, not used by Next.js App Router
import React from 'react';
import { cn } from '../lib/utils';
import { Palette } from 'lucide-react';

export function ThemeSelector({ theme, setTheme }: { theme: string, setTheme: (t: string) => void }) {
  const themes = [
    'casadina', 'tulum', 'balinesia', 'mallorca'
  ] as const;

  return (
    <div className="fixed top-44 right-6 z-50 flex flex-col gap-2 bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-gray-200/50 max-h-[70vh] overflow-y-auto">
      <div className="flex items-center gap-2 mb-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0 bg-white/80 backdrop-blur-md py-1">
        <Palette size={14} />
        <span>Design Options</span>
      </div>
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-xl transition-all text-left capitalize",
            theme === t 
              ? "bg-black text-white shadow-md scale-105" 
              : "bg-transparent text-gray-600 hover:bg-gray-100"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}