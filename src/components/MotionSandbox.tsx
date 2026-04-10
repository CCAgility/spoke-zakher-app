'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

// Register plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function MotionSandbox() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Cinematic Hero Array (Load Sequence)
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Subtle background scale-in (zoom out effect)
    tl.fromTo('.hero-bg', 
      { scale: 1.05 }, 
      { scale: 1, duration: 6 }
    );

    // Staggered text glide out of invisible masks
    tl.fromTo('.split-word', 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 },
      "-=5.0" 
    );

    // Fade in nav UI
    tl.fromTo('.hero-nav',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1 },
      "-=4.0"
    );

    // ... (ScrollTrigger section remains unchanged from here)
    
    // Architectural Downstream Array (Scroll Sequence)
    const mm = gsap.matchMedia(container);

    // Desktop/Tablet strict pinning logic (prevents iOS address bar resize layout jumps)
    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: ".amenities-wrapper",
        start: "top top",
        end: "bottom bottom",
        pin: ".amenities-sidebar",
        scrub: true,
        invalidateOnRefresh: true,
      });
    });

    // Staggered Bento Masks on scroll
    gsap.utils.toArray('.bento-item').forEach((item: any) => {
      gsap.fromTo(item,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, 
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%", // Trigger when top of item is 85% down viewport
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, { scope: container });

  return (
    <div ref={container} className="w-full text-white overflow-hidden bg-[#0A0A0A]">
      
      {/* Back to Safety */}
      <Link href="/es" className="fixed top-8 left-8 z-[100] border border-white/20 px-4 py-2 hover:bg-white/10 uppercase tracking-widest text-xs font-montserrat hero-nav backdrop-blur-md">
        Back to App
      </Link>

      {/* Custom Fonts Injection to strictly match original site */}
      <style dangerouslySetInnerHTML={{__html: `
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
      `}} />

      {/* Cinematic Hero Simulation */}
      <section className="relative h-[100vh] w-full overflow-hidden flex flex-col justify-end pb-32 px-8 md:px-16">
        
        {/* --- CINEMATIC HERO LAYER --- */}
        <div 
          className="hero-bg absolute inset-0 bg-cover origin-center z-0" 
          style={{ backgroundImage: 'url("/parent-hero.jpg")', backgroundPosition: 'center center' }}
        />

        {/* --- PROTECTIVE MATTE OVERLAYS --- */}
        <div className="absolute inset-0 z-20 bg-[#1A1A1A]/10 pointer-events-none"></div>
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

        <div className="relative z-30 text-white max-w-4xl">
          <div className="flex items-center gap-3 mb-6 font-montserrat text-xs tracking-[0.2em] uppercase text-white/80 hero-nav">
            <span className="border-b border-transparent pb-1">Cartagena, Colombia</span>
          </div>
          
          <h1 className="font-cormorant text-6xl md:text-8xl lg:text-9xl font-light leading-none mb-6 drop-shadow-lg">
            {/* Manually replicating SplitText block for accurate layout */}
            {"Grupo Zakher".split(' ').map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-4 last:mr-0 align-bottom">
                <span className="split-word block transform-gpu leading-none">
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p className="font-montserrat text-sm md:text-base font-light max-w-xl leading-relaxed text-white/90 hero-nav drop-shadow-md">
            Gestión inmobiliaria premium y listados de bienes raíces de lujo.
          </p>
        </div>
      </section>

      {/* Architectural Scroll Simulation */}
      <section className="amenities-wrapper relative w-full flex items-start bg-white text-black min-h-[250vh]">
        
        {/* Left Side: Pinned Content */}
        <div className="amenities-sidebar hidden md:flex sticky top-0 w-1/3 h-screen p-16 flex-col justify-center border-r border-gray-100/50">
          <span className="font-montserrat text-xs tracking-[0.3em] uppercase text-gray-500 mb-4 block">Floor Plan & Configuration</span>
          <h2 className="font-cormorant text-5xl font-light mb-8">The Golden Narratives</h2>
          <p className="font-montserrat text-sm text-gray-600 leading-relaxed max-w-sm">
            Scroll down to observe how the native GSAP intersection observers natively orchestrate the grid layout. The viewport calculates coordinates fluidly without hijacking normal user momentum.
          </p>
        </div>

        {/* Right Side: Scroll Content Grid */}
        <div className="w-full md:w-2/3 p-4 md:p-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <div 
                key={num} 
                className={`bento-item shadow-2xl overflow-hidden rounded-md bg-gray-100 ${num % 3 === 0 ? 'md:col-span-2 aspect-video' : 'aspect-square'}`}
              >
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('/gallery/casa-estrella/casa-estrella-double-room-5-${(num % 4) + 1}.jpeg')` }}
                />
              </div>
            ))}

          </div>
        </div>
      </section>

      <div className="h-[20vh] bg-[#0a0a0a]" /> 
    </div>
  );
}
