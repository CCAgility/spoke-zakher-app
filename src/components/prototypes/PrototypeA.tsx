'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export const PrototypeA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const img1Opacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 1, 0]);
  const img2Opacity = useTransform(scrollYProgress, [0.4, 0.6, 1], [0, 1, 1]);

  const text1Y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const text2Y = useTransform(scrollYProgress, [0.4, 1], [100, 0]);

  return (
    <div className="space-y-6">
      <h3 className="font-montserrat text-xs tracking-[0.2em] uppercase text-black mb-8 border-b pb-4">Module A: Cinematic Scroll</h3>
      <p className="font-montserrat text-sm text-gray-500 italic mb-4">Note: Scroll down inside the grey container to see the parallax effect.</p>
      
      <div ref={containerRef} className="relative h-[200vh] bg-gray-100">
        <div className="sticky top-[100px] h-[500px] w-full overflow-hidden bg-black">
            <motion.div style={{ opacity: img1Opacity }} className="absolute inset-0">
                 <Image src="/gallery/casa-estrella/casa-estrella-master-suite-1.jpeg" alt="Master Suite" fill className="object-cover opacity-60" />
                 <motion.div style={{ y: text1Y }} className="absolute inset-0 flex flex-col items-center justify-center text-white p-10 text-center">
                    <span className="font-montserrat text-xs tracking-[0.3em] uppercase mb-4">The Master Suite</span>
                    <h2 className="font-cormorant text-5xl">A Sanctuary of Colonial Elegance</h2>
                 </motion.div>
            </motion.div>

            <motion.div style={{ opacity: img2Opacity }} className="absolute inset-0">
                 <Image src="/gallery/casa-estrella/casa-estrella-bedroom.webp" alt="Junior Suite" fill className="object-cover opacity-60" />
                 <motion.div style={{ y: text2Y }} className="absolute inset-0 flex flex-col items-center justify-center text-white p-10 text-center">
                    <span className="font-montserrat text-xs tracking-[0.3em] uppercase mb-4">The Junior Suite</span>
                    <h2 className="font-cormorant text-5xl">Refined Botanical Comfort</h2>
                 </motion.div>
            </motion.div>
        </div>
      </div>
    </div>
  );
};
