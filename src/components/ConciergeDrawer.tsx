'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export function ConciergeDrawer({ 
  isOpen, 
  onClose, 
  initialTab = 'contact',
  t
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  initialTab?: 'contact' | 'reserve';
  t: any;
}) {
  const [drawerTab, setDrawerTab] = useState<'contact'|'reserve'>(initialTab);
  const [inquiryType, setInquiryType] = useState('reservation');
  const [contactLang, setContactLang] = useState("");

  // Sync initialTab when drawer opens
  useEffect(() => {
    if (isOpen) setDrawerTab(initialTab);
  }, [isOpen, initialTab]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[40%] bg-black/85 backdrop-blur-3xl z-50 p-8 md:p-12 text-white shadow-[-20px_0_50px_rgba(0,0,0,0.5)] border-l border-white/5 overflow-y-auto"
          >
            <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors duration-300"><X size={28} strokeWidth={1} /></button>
            
            {/* Concierge Segmented Control */}
            <div className="hidden bg-white/5 rounded-full p-1 mb-10 w-fit">
              <button 
                onClick={() => setDrawerTab('reserve')}
                className={`px-8 py-2 rounded-full text-[10px] font-montserrat tracking-[0.2em] uppercase transition-all duration-300 ${drawerTab === 'reserve' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:text-white'}`}
              >
                {t.reserve || t.bookNow || "Reserve"}
              </button>
              <button 
                onClick={() => setDrawerTab('contact')}
                className={`px-8 py-2 rounded-full text-[10px] font-montserrat tracking-[0.2em] uppercase transition-all duration-300 ${drawerTab === 'contact' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:text-white'}`}
              >
                {t.nav?.contact || "Concierge"}
              </button>
            </div>

            <h2 className="text-4xl font-cormorant font-light mb-2 tracking-wide">
              {drawerTab === 'reserve' ? (t.drawer?.bookYourStay || "Book Your Stay") : (t.contactForm?.title || "Contact Concierge")}
            </h2>
            <p className="text-gray-400 font-montserrat text-xs tracking-wide mb-12">
              {drawerTab === 'reserve' ? (t.drawer?.selectDates || "Select your dates to check availability.") : (t.contactForm?.subtitle || "How can we assist with your stay?")}
            </p>

            {/* Reserve Tab Content */}
            {drawerTab === 'reserve' && (
              <div className="space-y-8 font-montserrat animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
                  <p className="text-xs tracking-widest text-gray-500 uppercase mb-4">{t.drawer?.dates || "Dates"}</p>
                  <input type="text" placeholder={t.drawer?.checkInCheckOut || "Check In - Check Out"} className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:outline-none focus:border-white transition-colors" />
                </div>
                <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
                  <p className="text-xs tracking-widest text-gray-500 uppercase mb-4">{t.drawer?.guests || "Guests"}</p>
                  <select defaultValue={t.drawer?.twoGuests || "2 Guests"} className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer">
                    <option className="bg-[#1A1A1A]" value={t.drawer?.oneGuest || "1 Guest"}>{t.drawer?.oneGuest || "1 Guest"}</option>
                    <option className="bg-[#1A1A1A]" value={t.drawer?.twoGuests || "2 Guests"}>{t.drawer?.twoGuests || "2 Guests"}</option>
                    <option className="bg-[#1A1A1A]" value={t.drawer?.threeGuests || "3 Guests"}>{t.drawer?.threeGuests || "3 Guests"}</option>
                    <option className="bg-[#1A1A1A]" value={t.drawer?.fourPlusGuests || "4+ Guests"}>{t.drawer?.fourPlusGuests || "4+ Guests"}</option>
                  </select>
                </div>
                <div className="pt-4">
                  <button className="w-full bg-white text-black py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-transparent hover:text-white border border-white transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] relative overflow-hidden group">
                    <span className="relative z-10 group-hover:tracking-[0.4em] transition-all duration-500">{t.drawer?.checkAvailability || "Check Availability"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Contact Tab Content */}
            {drawerTab === 'contact' && (
              <form 
                onSubmit={(e) => { e.preventDefault(); alert(t.contactForm?.success || "Thanks for your inquiry. A concierge will be in touch shortly."); onClose(); }} 
                className="space-y-8 font-montserrat animate-in fade-in slide-in-from-left-4 duration-500"
              >
                {/* Inquiry Type Radios */}
                <div className="flex gap-4">
                  <label className="flex flex-1 items-center gap-3 cursor-pointer group border border-white/10 rounded-xl p-4 bg-white/5 hover:bg-white/10 transition-colors">
                    <input type="radio" name="inquiryType" value="reservation" checked={inquiryType === 'reservation'} onChange={(e) => setInquiryType(e.target.value)} className="peer sr-only" />
                    <div className="w-3 h-3 rounded-full border border-gray-500 peer-checked:border-white peer-checked:bg-white transition-all"></div>
                    <span className="text-gray-400 text-[9px] md:text-[10px] tracking-[0.2em] uppercase peer-checked:text-white transition-colors">{t.drawer?.reservation || "Reservation"}</span>
                  </label>
                  <label className="flex flex-1 items-center gap-3 cursor-pointer group border border-white/10 rounded-xl p-4 bg-white/5 hover:bg-white/10 transition-colors">
                    <input type="radio" name="inquiryType" value="questions" checked={inquiryType === 'questions'} onChange={(e) => setInquiryType(e.target.value)} className="peer sr-only" />
                    <div className="w-3 h-3 rounded-full border border-gray-500 peer-checked:border-white peer-checked:bg-white transition-all"></div>
                    <span className="text-gray-400 text-[9px] md:text-[10px] tracking-[0.2em] uppercase peer-checked:text-white transition-colors">{t.drawer?.questions || "Questions"}</span>
                  </label>
                </div>

                {inquiryType === 'reservation' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-2">
                    <div className="flex gap-6">
                      <div className="flex-1 relative">
                        <span className="absolute -top-4 left-0 text-[9px] uppercase tracking-widest text-gray-500">{t.drawer?.checkIn || "Check In"}</span>
                        <input type="date" className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:outline-none focus:border-gray-400 focus:shadow-[0_1px_0_rgba(156,163,175,0.4)] transition-all duration-300 [color-scheme:dark] cursor-pointer" />
                      </div>
                      <div className="flex-1 relative">
                        <span className="absolute -top-4 left-0 text-[9px] uppercase tracking-widest text-gray-500">{t.drawer?.checkOut || "Check Out"}</span>
                        <input type="date" className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:outline-none focus:border-gray-400 focus:shadow-[0_1px_0_rgba(156,163,175,0.4)] transition-all duration-300 [color-scheme:dark] cursor-pointer" />
                      </div>
                    </div>
                    <div className="relative">
                      <select defaultValue="" className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:outline-none focus:border-gray-400 focus:shadow-[0_1px_0_rgba(156,163,175,0.4)] transition-all duration-300 appearance-none cursor-pointer">
                        <option value="" disabled className="text-gray-500">{t.drawer?.numberOfGuests || "Number of Guests"}</option>
                        <option value="1" className="bg-[#1A1A1A] text-white">1 {t.drawer?.guests?.replace(/s$/i, '') || "Guest"}</option>
                        <option value="2" className="bg-[#1A1A1A] text-white">2 {t.drawer?.guests || "Guests"}</option>
                        <option value="3" className="bg-[#1A1A1A] text-white">{t.drawer?.threePlusGuests || "3+ Guests"}</option>
                        <option value="villa" className="bg-[#1A1A1A] text-white">{t.drawer?.entireVilla || "Entire Villa (Buyout)"}</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 pb-2">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </motion.div>
                )}

                <input required type="text" placeholder={t.contactForm?.name || "Full Name *"} className="w-full bg-transparent border-b border-gray-700 text-white placeholder:text-gray-500 pb-3 focus:outline-none focus:border-gray-400 focus:shadow-[0_1px_0_rgba(156,163,175,0.4)] transition-all duration-300" />
                <input required type="email" placeholder={t.contactForm?.email || "Email Address *"} className="w-full bg-transparent border-b border-gray-700 text-white placeholder:text-gray-500 pb-3 focus:outline-none focus:border-gray-400 focus:shadow-[0_1px_0_rgba(156,163,175,0.4)] transition-all duration-300" />
                <input required type="tel" placeholder={t.contactForm?.phone || "WhatsApp / Phone *"} className="w-full bg-transparent border-b border-gray-700 text-white placeholder:text-gray-500 pb-3 focus:outline-none focus:border-gray-400 focus:shadow-[0_1px_0_rgba(156,163,175,0.4)] transition-all duration-300" />
                <div className="relative">
                  <select value={contactLang} onChange={(e) => setContactLang(e.target.value)} className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:outline-none focus:border-gray-400 focus:shadow-[0_1px_0_rgba(156,163,175,0.4)] transition-all duration-300 appearance-none cursor-pointer">
                    <option value="" disabled className="text-gray-500">{t.contactForm?.language || "Preferred Language (Optional)"}</option>
                    <option value="en" className="bg-[#1A1A1A] text-white">English</option>
                    <option value="es" className="bg-[#1A1A1A] text-white">Español</option>
                    <option value="pt" className="bg-[#1A1A1A] text-white">Português</option>
                    <option value="fr" className="bg-[#1A1A1A] text-white">Français</option>
                    <option value="other" className="bg-[#1A1A1A] text-white">Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 pb-2">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                {contactLang === 'other' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <input type="text" placeholder={t.contactForm?.specifyLanguage || "Please specify language"} className="w-full bg-transparent border-b border-gray-700 text-white placeholder:text-gray-500 pb-3 focus:outline-none focus:border-gray-400 focus:shadow-[0_1px_0_rgba(156,163,175,0.4)] transition-all duration-300" />
                  </motion.div>
                )}
                <textarea required placeholder={t.contactForm?.requests || "Message/Special Requests *"} rows={3} className="w-full bg-transparent border-b border-gray-700 text-white placeholder:text-gray-500 pb-3 focus:outline-none focus:border-gray-400 focus:shadow-[0_1px_0_rgba(156,163,175,0.4)] transition-all duration-300 resize-none"></textarea>
                
                <div className="pt-4">
                  <button type="submit" className="w-full bg-white text-black py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-transparent hover:text-white border border-white transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] relative overflow-hidden group">
                    <span className="relative z-10 group-hover:tracking-[0.4em] transition-all duration-500">{t.contactForm?.send || "Send Message"}</span>
                  </button>
                  <p className="mt-6 text-center text-[9px] font-montserrat text-gray-500/70 tracking-widest uppercase">
                    * {t.contactForm?.mandatory || "Indicates a mandatory field"}
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
