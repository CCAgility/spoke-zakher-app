import React from 'react';
import { motion } from 'motion/react';
import { Utensils, Leaf, Plane, Wine } from 'lucide-react';

export function Experiences() {
  return (
    <div className="bg-white pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="font-serif text-5xl md:text-7xl mb-6 text-gray-900">Curated Experiences</h1>
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            Elevate your stay with our bespoke services. From private chefs to wellness therapies, every detail is tailored to your desires.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            { 
              icon: <Utensils size={32} />, 
              title: "Gourmet Dining", 
              desc: "Experience the vibrant flavors of Colombia with our private chef services. From intimate dinners to lavish breakfasts, enjoy world-class cuisine in the comfort of your villa." 
            },
            { 
              icon: <Leaf size={32} />, 
              title: "Wellness & Spa", 
              desc: "Rejuvenate your body and mind with our on-site massage and yoga services. Transform your suite or the rooftop into a private sanctuary." 
            },
            { 
              icon: <Plane size={32} />, 
              title: "Airport Transfers", 
              desc: "Arrive in style and comfort. Our private, secure transportation ensures a seamless journey from the airport directly to Casa Estrella." 
            },
            { 
              icon: <Wine size={32} />, 
              title: "Rooftop Bar", 
              desc: "Enjoy sunset cocktails with panoramic views of the historic walled city. Our bartender can craft bespoke drinks tailored to your taste." 
            }
          ].map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-8 p-8 border border-gray-100 bg-gray-50 hover:bg-white transition-colors shadow-sm">
              <div className="text-gray-400 shrink-0">{item.icon}</div>
              <div>
                <h3 className="font-serif text-2xl mb-4">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}