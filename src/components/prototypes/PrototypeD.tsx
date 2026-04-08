'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PrototypeD = () => {
  const [activeRoom, setActiveRoom] = useState<any>(null);

  return (
    <div className="space-y-6">
      <h3 className="font-montserrat text-xs tracking-[0.2em] uppercase text-black mb-8 border-b pb-4">Module D: Interactive Bento Grid</h3>

      <div className="grid grid-cols-2 gap-3">
        {/* Master Suite Bento (Spans full width) */}
        <div className="col-span-2 group relative h-[250px] overflow-hidden cursor-pointer" onClick={() => setActiveRoom({ title: 'Master Suite', img: '/gallery/casa-estrella/casa-estrella-master-suite-1.jpeg', desc: 'King bed, Sofa, Private Bath, TV, A/C' })}>
          <Image src="/gallery/casa-estrella/casa-estrella-master-suite-1.jpeg" alt="Master Suite" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500" />
          <div className="absolute bottom-6 left-6 text-white">
            <h4 className="font-cormorant text-3xl mb-1 drop-shadow-md">Master Suite</h4>
            <span className="font-montserrat text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">View Layout <ChevronRight size={14} /></span>
          </div>
        </div>
        
        {/* Junior Suite Bento */}
        <div className="col-span-1 group relative h-[200px] overflow-hidden cursor-pointer" onClick={() => setActiveRoom({ title: 'Junior Suite', img: '/gallery/casa-estrella/casa-estrella-bedroom.webp', desc: 'King bed, Sofa, Private Bath, TV, A/C' })}>
          <Image src="/gallery/casa-estrella/casa-estrella-bedroom.webp" alt="Junior Suite" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500" />
          <div className="absolute bottom-5 left-5 text-white">
            <h4 className="font-cormorant text-xl md:text-2xl mb-1 drop-shadow-md">Junior Suite</h4>
            <span className="font-montserrat text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore</span>
          </div>
        </div>

        {/* Standard Rooms Bento */}
        <div className="col-span-1 group relative h-[200px] overflow-hidden cursor-pointer" onClick={() => setActiveRoom({ title: 'Double Rooms', img: '/gallery/casa-estrella/6.webp', desc: 'Double bed, Shared Bath, A/C. 5 Rooms Total.' })}>
          <Image src="/gallery/casa-estrella/6.webp" alt="Double Rooms" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-colors duration-500" />
          <div className="absolute bottom-5 left-5 text-white">
            <h4 className="font-cormorant text-xl md:text-2xl mb-1 drop-shadow-md">Guest Rooms</h4>
            <span className="font-montserrat text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore</span>
          </div>
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 font-montserrat text-[10px] uppercase tracking-widest text-white border border-white/20">
            5 ROOMS
          </div>
        </div>
      </div>

      {/* Room Modal Prototype (Option B Demo hybrid) */}
      <AnimatePresence>
        {activeRoom && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 md:p-6"
            onClick={() => setActiveRoom(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl bg-[#1A1A1A] border border-white/10 shadow-2xl flex flex-col md:flex-row overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full md:w-2/3 h-[250px] md:h-[600px] bg-black">
                <Image src={activeRoom.img} alt={activeRoom.title} fill className="object-cover" />
              </div>
              <div className="w-full md:w-1/3 p-10 flex flex-col justify-center bg-white">
                <button className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors" onClick={() => setActiveRoom(null)}><X size={24} strokeWidth={1} /></button>
                <span className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-4 block">Casa Estrella de San Pedro</span>
                <h2 className="font-cormorant text-5xl text-black mb-8">{activeRoom.title}</h2>
                <h4 className="font-montserrat text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">Suite Configuration</h4>
                <p className="font-montserrat text-sm font-light leading-relaxed text-gray-700 mb-12">
                  {activeRoom.desc}. Enjoy the ultimate privacy and luxury of Casa Estrella in this meticulously restored, flawlessly air-conditioned space.
                </p>
                <button className="border border-black px-8 py-3 font-montserrat text-xs uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors active:scale-95 duration-300" onClick={() => setActiveRoom(null)}>Close Viewer</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
