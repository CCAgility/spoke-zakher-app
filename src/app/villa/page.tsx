'use client';
import React from 'react';
import { motion } from 'motion/react';
import { BedDouble, Bath, Square, Users } from 'lucide-react';

export default function Villa() {
  return (
    <div className="bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="font-serif text-5xl md:text-7xl mb-6 text-gray-900">The Villa</h1>
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            Seven meticulously designed suites offering total privacy and uncompromising luxury. Each room is a sanctuary of comfort, blending colonial charm with modern amenities.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 border-y border-gray-200 py-12">
          {[
            { icon: <BedDouble size={24} />, label: "7 Bedrooms", desc: "En-suite luxury" },
            { icon: <Users size={24} />, label: "14 Guests", desc: "Maximum capacity" },
            { icon: <Bath size={24} />, label: "8 Bathrooms", desc: "Spa-like finishes" },
            { icon: <Square size={24} />, label: "10,000 sq ft", desc: "Living space" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="text-gray-400 mb-4">{stat.icon}</div>
              <h3 className="font-bold tracking-widest uppercase text-sm mb-1">{stat.label}</h3>
              <p className="text-gray-500 text-sm">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img 
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0430-AVL7R1jyNyFoWb4O.jpeg" 
            alt="Dining Area" 
            className="w-full h-[60vh] object-cover"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan15JwwoxIyZnZ0/_mg_0389-mp8WRqw9M5T49WDb.jpeg" 
            alt="Living Area" 
            className="w-full h-[60vh] object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
}