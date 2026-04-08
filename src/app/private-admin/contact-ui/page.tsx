'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export default function ContactUIPreview() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const BackgroundContent = () => (
    <div className="absolute inset-0 z-0 bg-black">
      <img src="/gallery/casa-estrella/casa-estrella-living-room.webp" alt="Background" className="w-full h-full object-cover grayscale opacity-30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl text-white font-serif mb-8 text-center max-w-2xl drop-shadow-md">UI Showcase Sandbox</h1>
        <div className="flex gap-4 flex-wrap justify-center">
          <button onClick={() => setActiveModal('glass')} className="px-6 py-3 bg-[#1A1A1A] text-white tracking-widest text-xs uppercase hover:bg-white hover:text-black transition-colors shadow-xl border border-white/20">
            Test Option 1: Glass Fade
          </button>
          <button onClick={() => setActiveModal('drawer')} className="px-6 py-3 bg-[#1A1A1A] text-white tracking-widest text-xs uppercase hover:bg-white hover:text-black transition-colors shadow-xl border border-white/20">
            Test Option 2: Drawer Slide
          </button>
          <button onClick={() => setActiveModal('morph')} className="px-6 py-3 bg-[#1A1A1A] text-white tracking-widest text-xs uppercase hover:bg-white hover:text-black transition-colors shadow-xl border border-white/20">
            Test Option 3: Widget Expand
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-[#F9F9F9] overflow-hidden font-sans">
      <BackgroundContent />

      {/* Option 1: Glassmorphic Modal */}
      <AnimatePresence>
        {activeModal === 'glass' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-black/60 p-6"
          >
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md p-8 border border-white/20 text-white shadow-2xl">
              <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 hover:opacity-70"><X size={20} /></button>
              <h2 className="text-2xl font-serif font-light mb-6">Direct Inquiry</h2>
              <input type="text" placeholder="Name" className="w-full bg-transparent border-b border-white/30 text-white placeholder:text-white/50 pb-2 mb-6 focus:outline-none focus:border-white transition-colors" />
              <input type="email" placeholder="Email or WhatsApp" className="w-full bg-transparent border-b border-white/30 text-white placeholder:text-white/50 pb-2 mb-8 focus:outline-none focus:border-white transition-colors" />
              <button className="w-full bg-white text-black py-4 text-xs tracking-widest uppercase hover:bg-gray-200 transition-colors">Submit Request</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Option 2: Off-Canvas Drawer */}
      <AnimatePresence>
        {activeModal === 'drawer' && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-[#1A1A1A] z-50 p-8 text-white shadow-2xl border-l border-white/10"
            >
              <button onClick={() => setActiveModal(null)} className="absolute top-8 right-8 hover:opacity-70"><X size={20} /></button>
              <h2 className="text-3xl font-serif font-light mb-2">Contact Concierge</h2>
              <p className="text-gray-400 text-sm mb-12">How can we assist with your stay?</p>
              <div className="space-y-8">
                <input type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-gray-700 text-white placeholder:text-gray-500 pb-3 focus:outline-none focus:border-white transition-colors" />
                <input type="text" placeholder="WhatsApp / Phone" className="w-full bg-transparent border-b border-gray-700 text-white placeholder:text-gray-500 pb-3 focus:outline-none focus:border-white transition-colors" />
                <textarea placeholder="Special Requests" rows={4} className="w-full bg-transparent border-b border-gray-700 text-white placeholder:text-gray-500 pb-3 focus:outline-none focus:border-white transition-colors resize-none"></textarea>
                <button className="w-full bg-white text-black py-4 text-xs tracking-widest uppercase hover:bg-gray-200 transition-colors mt-4">Send Message</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Option 3: Widget Morph */}
      <AnimatePresence>
        {activeModal === 'morph' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center pb-8 p-4 bg-black/20"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ width: '300px', height: '60px', borderRadius: '30px' }}
              animate={{ width: '100%', maxWidth: '600px', height: 'auto', borderRadius: '16px' }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-serif text-black">Direct Booking Inquiry</h2>
                <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-black"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Check-in - Check-out</label>
                    <div className="text-lg font-serif">Select dates</div>
                  </div>
                  <div className="w-[1px] bg-gray-200"></div>
                  <div className="flex-1 pl-4">
                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Guests</label>
                    <div className="text-lg font-serif">2 Adults</div>
                  </div>
                </div>
                <div className="pt-4 space-y-4">
                  <input type="email" placeholder="Your Email Address" className="w-full bg-gray-50 p-4 border border-gray-200 focus:outline-none focus:border-black transition-colors" />
                  <button className="w-full bg-black text-white py-4 text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors">Request Availability</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
