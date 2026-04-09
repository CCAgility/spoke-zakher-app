'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Silently log infrastructure errors without leaking to DOM
    console.error("Promax Error Boundary Triggered:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white flex flex-col items-center justify-center p-6 selection:bg-[#8BA3A0] selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@200;300;400;500&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
      `}} />
      
      <div className="max-w-2xl text-center flex flex-col items-center">
        <span className="font-montserrat text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/50 mb-6 block">
          Service Unavailable
        </span>
        <h1 className="font-cormorant text-5xl md:text-7xl font-light leading-tight mb-8">
          A Moment of Reflection
        </h1>
        <p className="font-montserrat text-sm md:text-base font-light text-white/80 leading-relaxed max-w-lg mb-12">
          We are currently refining the sanctuary and experiencing a brief interruption in service. Our concierge team has been notified.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <button
            onClick={() => reset()}
            className="border border-white/60 hover:bg-white hover:text-black px-10 py-4 font-montserrat text-xs tracking-[0.2em] uppercase transition-all duration-300 active:scale-95"
          >
            Refresh Sanctuary
          </button>
          
          <a href="/" className="font-montserrat text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors py-4">
            Return Home
          </a>
        </div>

        {/* Development Only Stack Trace for local debugging without compromising Prod */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-24 text-left w-full max-w-xl">
             <details className="text-white/30 text-xs font-mono">
               <summary className="cursor-pointer tracking-widest uppercase mb-2">Dev Stack Trace</summary>
               <pre className="overflow-x-auto p-4 bg-white/5 border border-white/10 rounded">{error.message}</pre>
             </details>
          </div>
        )}
      </div>
    </div>
  );
}
