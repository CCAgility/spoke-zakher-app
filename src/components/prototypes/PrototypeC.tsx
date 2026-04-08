'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

const IMAGES = [
  { id: 1, src: '/gallery/casa-estrella/casa-estrella-master-suite-1.jpeg', category: 'suites', aspect: 'aspect-[4/3]'
  },
  { id: 2, src: '/gallery/casa-estrella/6.webp', category: 'guest', aspect: 'aspect-[3/4]'
  },
  { id: 3, src: '/gallery/casa-estrella/casa-estrella-bedroom.webp', category: 'suites', aspect: 'aspect-square'
  },
  { id: 4, src: '/gallery/casa-estrella/casa-estrella-master-suite-1.jpeg', category: 'suites', aspect: 'aspect-[3/4]'
  },
];

export const PrototypeC = () => {
  const [filter, setFilter] = useState('all');

  const filteredImages = IMAGES.filter(img => filter === 'all' || img.category === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b pb-4 mb-8">
        <h3 className="font-montserrat text-xs tracking-[0.2em] uppercase text-black">Module C: Masonry Lookbook</h3>
        <div className="flex gap-4 font-montserrat text-[10px] tracking-widest uppercase">
            <button onClick={() => setFilter('all')} className={`${filter === 'all' ? 'text-black font-semibold' : 'text-gray-400 hover:text-black'}`}>All</button>
            <button onClick={() => setFilter('suites')} className={`${filter === 'suites' ? 'text-black font-semibold' : 'text-gray-400 hover:text-black'}`}>Suites</button>
            <button onClick={() => setFilter('guest')} className={`${filter === 'guest' ? 'text-black font-semibold' : 'text-gray-400 hover:text-black'}`}>Guest</button>
        </div>
      </div>

      <div className="columns-1 md:columns-2 gap-4 space-y-4">
        {filteredImages.map(img => (
          <motion.div 
            layout 
            key={img.id} 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className={`relative w-full overflow-hidden group cursor-pointer ${img.aspect}`}
          >
            <Image src={img.src} alt="Gallery" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
