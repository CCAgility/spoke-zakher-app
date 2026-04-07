'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw } from 'lucide-react';
import { clearServerCache } from '../app/actions/revalidate';

export function DevCacheButton() {
  const router = useRouter();
  const [isClearing, setIsClearing] = useState(false);

  const handleClear = async () => {
    setIsClearing(true);
    try {
      // Clear server-side fetch cache
      await clearServerCache();
      // Clear client-side router cache
      router.refresh();
      // Force hard reload of the window just to be absolutely certain
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      <button 
        onClick={handleClear}
        disabled={isClearing}
        className="bg-black/90 text-white px-4 py-3 rounded-full flex items-center gap-2 shadow-2xl border border-white/20 hover:bg-black transition-all hover:scale-105 active:scale-95"
        title="Force Refresh Data from Directus CMS"
      >
        <RefreshCw size={14} className={isClearing ? 'animate-spin text-[#C2A878]' : 'text-[#C2A878]'} />
        <span className="font-montserrat text-[10px] tracking-widest uppercase mt-[2px]">
          {isClearing ? 'Purging Cache...' : 'Flush Cache (UAT)'}
        </span>
      </button>
    </div>
  );
}
