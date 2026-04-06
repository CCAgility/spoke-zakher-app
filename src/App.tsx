/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MallorcaTheme } from '@/components/MallorcaTheme';
import { GrupoZakher } from '@/components/GrupoZakher';
import { LanguageSelector } from '@/components/LanguageSelector';
import { AIChat } from '@/components/AIChat';
import { Download } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<string>('en');

  return (
    <BrowserRouter>
      <div className="relative">
        <LanguageSelector lang={lang} setLang={setLang} />
        
        <Routes>
          <Route path="/" element={<GrupoZakher lang={lang} />} />
          <Route path="/casa-estrella" element={<MallorcaTheme lang={lang} />} />
        </Routes>
        
        <AIChat lang={lang} />

        {/* Floating Download Project Button */}
        <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
          <a 
            href="/project.zip" 
            download="project.zip"
            className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors flex items-center justify-center group"
            title="Download Project ZIP"
          >
            <Download size={24} />
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out text-sm font-medium">
              Download Project ZIP
            </span>
          </a>
          <a 
            href="/all_code.txt" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black border border-gray-200 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center group"
            title="View All Source Code"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out text-sm font-medium">
              View All Code (Text)
            </span>
          </a>
        </div>
      </div>
    </BrowserRouter>
  );
}