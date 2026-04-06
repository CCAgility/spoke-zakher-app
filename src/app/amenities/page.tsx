import React from 'react';
import { motion } from 'motion/react';
import { Waves, Shield, Wifi, Coffee } from 'lucide-react';

export function Amenities() {
  return (
    <div className="bg-gray-50 pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="font-serif text-5xl md:text-7xl mb-6 text-gray-900">Amenities</h1>
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            Experience resort-style luxury with the privacy of a private estate. Casa Estrella is fully staffed and equipped to exceed your expectations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Waves size={32} />, title: "Private Pools", desc: "A stunning main pool and an intimate mini pool for ultimate relaxation." },
            { icon: <Shield size={32} />, title: "24/7 Security", desc: "Dedicated security personnel from 6 PM to 7 AM for your peace of mind." },
            { icon: <Coffee size={32} />, title: "Daily Housekeeping", desc: "Complimentary daily cleaning and turndown service." },
            { icon: <Wifi size={32} />, title: "High-Speed WiFi", desc: "Seamless connectivity throughout the entire estate." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-black mb-6">{item.icon}</div>
              <h3 className="font-serif text-2xl mb-4">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}