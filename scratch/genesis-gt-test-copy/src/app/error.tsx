'use client';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void; }) {
  useEffect(() => { 
    // Silently log infrastructure errors without leaking to DOM
    console.error("Genesis Base Error Boundary Triggered:", error); 
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 selection:bg-gray-700">
      <div className="max-w-2xl text-center flex flex-col items-center font-sans">
        <span className="text-xs tracking-[0.3em] uppercase text-white/50 mb-6 block">
          Service Unavailable
        </span>
        <h1 className="text-4xl md:text-5xl font-light leading-tight mb-8">
          System Interruption
        </h1>
        <p className="text-sm md:text-base font-light text-white/80 leading-relaxed max-w-lg mb-12">
          We are currently performing maintenance or experiencing a brief interruption in service. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <button 
            onClick={() => reset()} 
            className="border border-white/60 hover:bg-white hover:text-black px-10 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300"
          >
            Retry Connection
          </button>
        </div>
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
