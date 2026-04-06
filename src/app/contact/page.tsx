import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Contact() {
  return (
    <div className="bg-gray-50 pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="font-serif text-5xl md:text-7xl mb-6 text-gray-900">Contact</h1>
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            Ready to experience Casa Estrella? Our concierge team is available to assist with reservations and inquiries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="flex items-start gap-6">
              <div className="bg-black text-white p-4 rounded-full shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2">Email Us</h3>
                <p className="text-gray-600 mb-1">For general inquiries and reservations.</p>
                <a href="mailto:Reservas@grupozakher.com" className="font-medium hover:underline">Reservas@grupozakher.com</a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-black text-white p-4 rounded-full shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2">Call Us</h3>
                <p className="text-gray-600 mb-1">Available 24/7 for immediate assistance.</p>
                <a href="tel:+573148182656" className="font-medium hover:underline block">+57 314 818 2656</a>
                <a href="tel:+573052999971" className="font-medium hover:underline block">+57 305 299 9971</a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-black text-white p-4 rounded-full shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2">Location</h3>
                <p className="text-gray-600 mb-1">Located in the historic center.</p>
                <p className="font-medium">Cartagena de Indias, Colombia</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-12 shadow-xl border border-gray-100">
            <h3 className="font-serif text-3xl mb-8">Send an Inquiry</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"></textarea>
              </div>
              <button type="submit" className="w-full bg-black text-white py-4 font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}