'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export function ConciergeDrawer({ 
  isOpen, 
  onClose, 
  initialTab = 'contact',
  t,
  drawerImage
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  initialTab?: 'contact' | 'reserve';
  t: any;
  drawerImage?: string;
}) {
  const [drawerTab, setDrawerTab] = useState<'contact'|'reserve'>(initialTab);
  const [inquiryType, setInquiryType] = useState('reservation');
  const [contactLang, setContactLang] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: '', checkIn: '', checkOut: '', guests: '', otherLanguage: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const dates = (formData.checkIn && formData.checkOut) ? `${formData.checkIn} to ${formData.checkOut}` : '';
      const finalLang = contactLang === 'other' ? formData.otherLanguage : contactLang;
      
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        type: inquiryType,
        property: 'Casa Estrella',
        dates,
        guests: formData.guests,
        language: finalLang
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Submission failed');
      
      // GTM Conversion Telemetry — fire lead event for Google Ads ROAS tracking
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'concierge_lead_submit',
          lead_type: inquiryType,
          property: 'Casa Estrella',
          contact_language: contactLang || 'not_specified',
        });
      }

      alert(t.contactForm?.success || "Thanks for your inquiry. A concierge will be in touch shortly.");
      
      setFormData({ name: '', email: '', phone: '', message: '', checkIn: '', checkOut: '', guests: '', otherLanguage: '' });
      onClose();
    } catch (err) {
      console.error(err);
      alert("There was a system error. Please email Reservas@grupozakher.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            className="fixed right-0 top-0 bottom-0 w-full md:w-[40%] bg-[#0A0A0A]/95 backdrop-blur-3xl z-50 text-white shadow-[-20px_0_50px_rgba(0,0,0,0.5)] border-l border-[#D4AF37]/30 overflow-y-auto"
          >
            {/* Header Image Section */}
            {drawerImage && (
              <div className="relative w-full h-[250px] mb-8">
                <img src={drawerImage} alt="Property location" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/95 via-[#0A0A0A]/60 to-transparent"></div>
                <button onClick={onClose} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors duration-300 z-10"><X size={28} strokeWidth={1} /></button>
                <div className="absolute bottom-6 left-8 right-8 z-10">
                   <h2 className="text-3xl md:text-4xl font-cormorant font-light mb-1 tracking-wide text-[#D4AF37]">
                     {drawerTab === 'reserve' ? (t.drawer?.bookYourStay || "Book Your Stay") : (t.contactForm?.title || "Contact Concierge")}
                   </h2>
                   <p className="text-gray-300 font-montserrat text-[10px] uppercase tracking-widest">
                     {drawerTab === 'reserve' ? (t.drawer?.selectDates || "Select your dates to check availability.") : (t.contactForm?.subtitle || "How can we assist with your stay?")}
                   </p>
                </div>
              </div>
            )}

            {!drawerImage && (
               <div className="p-8 md:p-12 pb-0 relative">
                  <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors duration-300"><X size={28} strokeWidth={1} /></button>
                  <h2 className="text-3xl md:text-4xl font-cormorant font-light mb-2 tracking-wide text-[#D4AF37]">
                    {drawerTab === 'reserve' ? (t.drawer?.bookYourStay || "Book Your Stay") : (t.contactForm?.title || "Contact Concierge")}
                  </h2>
                  <p className="text-gray-400 font-montserrat text-[10px] uppercase tracking-widest mb-10">
                    {drawerTab === 'reserve' ? (t.drawer?.selectDates || "Select your dates to check availability.") : (t.contactForm?.subtitle || "How can we assist with your stay?")}
                  </p>
               </div>
            )}

            <div className="px-8 md:px-12 pb-12">
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



            {/* Reserve Tab Content */}
            {drawerTab === 'reserve' && (
              <div className="space-y-6 font-montserrat animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="relative">
                  <span className="absolute -top-3 left-3 bg-[#0A0A0A] px-2 text-[9px] uppercase tracking-widest text-[#D4AF37]">{t.drawer?.dates || "Dates"}</span>
                  <input type="text" placeholder={t.drawer?.checkInCheckOut || "Check In - Check Out"} className="w-full bg-white/5 border border-white/20 rounded-md text-white px-4 py-4 focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_10px_rgba(212,175,55,0.1)] transition-all duration-300" />
                </div>
                <div className="relative pt-2">
                  <span className="absolute -top-1 left-3 bg-[#0A0A0A] px-2 text-[9px] uppercase tracking-widest text-[#D4AF37] z-10">{t.drawer?.guests || "Guests"}</span>
                  <select defaultValue={t.drawer?.twoGuests || "2 Guests"} className="w-full bg-white/5 border border-white/20 rounded-md text-white px-4 py-4 focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_10px_rgba(212,175,55,0.1)] transition-all duration-300 appearance-none cursor-pointer">
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
                onSubmit={handleSubmit} 
                className="space-y-8 font-montserrat animate-in fade-in slide-in-from-left-4 duration-500"
              >
                {/* Inquiry Type Radios */}
                <div className="flex gap-4">
                  <label className="flex flex-1 items-center gap-3 cursor-pointer group border border-white/20 rounded-md p-4 bg-white/5 hover:border-[#D4AF37]/50 transition-colors">
                    <input type="radio" name="inquiryType" value="reservation" checked={inquiryType === 'reservation'} onChange={(e) => setInquiryType(e.target.value)} className="peer sr-only" />
                    <div className="w-3 h-3 rounded-full border border-gray-500 peer-checked:border-[#D4AF37] peer-checked:bg-[#D4AF37] transition-all"></div>
                    <span className="text-gray-400 text-[9px] md:text-[10px] tracking-[0.2em] uppercase peer-checked:text-[#D4AF37] transition-colors">{t.drawer?.reservation || "Reservation"}</span>
                  </label>
                  <label className="flex flex-1 items-center gap-3 cursor-pointer group border border-white/20 rounded-md p-4 bg-white/5 hover:border-[#D4AF37]/50 transition-colors">
                    <input type="radio" name="inquiryType" value="questions" checked={inquiryType === 'questions'} onChange={(e) => setInquiryType(e.target.value)} className="peer sr-only" />
                    <div className="w-3 h-3 rounded-full border border-gray-500 peer-checked:border-[#D4AF37] peer-checked:bg-[#D4AF37] transition-all"></div>
                    <span className="text-gray-400 text-[9px] md:text-[10px] tracking-[0.2em] uppercase peer-checked:text-[#D4AF37] transition-colors">{t.drawer?.questions || "Questions"}</span>
                  </label>
                </div>

                {inquiryType === 'reservation' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-2">
                    <div className="flex gap-4">
                      <div className="flex-1 relative">
                        <span className="absolute -top-3 left-3 bg-[#0A0A0A] px-1 text-[9px] uppercase tracking-widest text-gray-400 z-10">{t.drawer?.checkIn || "Check In"}</span>
                        <input type="date" name="checkIn" value={formData.checkIn} onChange={handleInputChange} className="w-full bg-white/5 border border-white/20 rounded-md text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_10px_rgba(212,175,55,0.1)] transition-all duration-300 [color-scheme:dark] cursor-pointer" />
                      </div>
                      <div className="flex-1 relative">
                        <span className="absolute -top-3 left-3 bg-[#0A0A0A] px-1 text-[9px] uppercase tracking-widest text-gray-400 z-10">{t.drawer?.checkOut || "Check Out"}</span>
                        <input type="date" name="checkOut" value={formData.checkOut} onChange={handleInputChange} className="w-full bg-white/5 border border-white/20 rounded-md text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_10px_rgba(212,175,55,0.1)] transition-all duration-300 [color-scheme:dark] cursor-pointer" />
                      </div>
                    </div>
                    <div className="relative">
                      <select name="guests" value={formData.guests} onChange={handleInputChange} className="w-full bg-white/5 border border-white/20 rounded-md text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_10px_rgba(212,175,55,0.1)] transition-all duration-300 appearance-none cursor-pointer">
                        <option value="" disabled className="text-gray-500">{t.drawer?.numberOfGuests || "Number of Guests"}</option>
                        <option value="1" className="bg-[#1A1A1A] text-white">1 {t.drawer?.guests?.replace(/s$/i, '') || "Guest"}</option>
                        <option value="2" className="bg-[#1A1A1A] text-white">2 {t.drawer?.guests || "Guests"}</option>
                        <option value="3" className="bg-[#1A1A1A] text-white">{t.drawer?.threePlusGuests || "3+ Guests"}</option>
                        <option value="villa" className="bg-[#1A1A1A] text-white">{t.drawer?.entireVilla || "Entire Villa (Buyout)"}</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </motion.div>
                )}

                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder={t.contactForm?.name || "Full Name *"} className="w-full bg-white/5 border border-white/20 rounded-md text-white placeholder:text-gray-500 px-4 py-3 focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_10px_rgba(212,175,55,0.1)] transition-all duration-300" />
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder={t.contactForm?.email || "Email Address *"} className="w-full bg-white/5 border border-white/20 rounded-md text-white placeholder:text-gray-500 px-4 py-3 focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_10px_rgba(212,175,55,0.1)] transition-all duration-300" />
                <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder={t.contactForm?.phone || "WhatsApp / Phone *"} className="w-full bg-white/5 border border-white/20 rounded-md text-white placeholder:text-gray-500 px-4 py-3 focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_10px_rgba(212,175,55,0.1)] transition-all duration-300" />
                
                <div className="relative">
                  <select value={contactLang} onChange={(e) => setContactLang(e.target.value)} className="w-full bg-white/5 border border-white/20 rounded-md text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_10px_rgba(212,175,55,0.1)] transition-all duration-300 appearance-none cursor-pointer">
                    <option value="" disabled className="text-gray-500">{t.contactForm?.language || "Preferred Language (Optional)"}</option>
                    <option value="en" className="bg-[#1A1A1A] text-white">English</option>
                    <option value="es" className="bg-[#1A1A1A] text-white">Español</option>
                    <option value="pt" className="bg-[#1A1A1A] text-white">Português</option>
                    <option value="fr" className="bg-[#1A1A1A] text-white">Français</option>
                    <option value="other" className="bg-[#1A1A1A] text-white">{t.contactForm?.otherLanguage || "Other"}</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>

                {contactLang === 'other' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <input type="text" name="otherLanguage" value={formData.otherLanguage} onChange={handleInputChange} placeholder={t.contactForm?.specifyLanguage || "Please specify language"} className="w-full bg-white/5 border border-white/20 rounded-md text-white placeholder:text-gray-500 px-4 py-3 focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_10px_rgba(212,175,55,0.1)] transition-all duration-300" />
                  </motion.div>
                )}
                
                <textarea required name="message" value={formData.message} onChange={handleInputChange} placeholder={t.contactForm?.requests || "Message/Special Requests *"} rows={3} className="w-full bg-white/5 border border-white/20 rounded-md text-white placeholder:text-gray-500 px-4 py-3 focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_10px_rgba(212,175,55,0.1)] transition-all duration-300 resize-none"></textarea>
                
                <div className="pt-6">
                  <style dangerouslySetInnerHTML={{__html: `
                    @keyframes drawerBreath {
                      0%, 100% { background-color: transparent; border-color: rgba(212,175,55,0.5); color: #D4AF37; box-shadow: 0 0 15px rgba(212,175,55,0.05); }
                      50% { background-color: rgba(212,175,55,0.15); border-color: #D4AF37; color: white; box-shadow: 0 10px 30px rgba(212,175,55,0.3); }
                    }
                    .animate-drawer-breath {
                      animation: drawerBreath 4s ease-in-out infinite;
                    }
                    .animate-drawer-breath:hover {
                      animation-play-state: paused;
                      background-color: #D4AF37;
                      color: #1A1A1A;
                      border-color: #D4AF37;
                      box-shadow: 0 10px 30px rgba(212,175,55,0.5);
                    }
                  `}} />
                  <button type="submit" disabled={isSubmitting} className="group w-full py-4 font-montserrat text-[10px] md:text-xs tracking-[0.3em] uppercase transition-all duration-700 ease-out font-medium active:scale-[0.98] relative overflow-hidden border disabled:opacity-50 disabled:cursor-not-allowed animate-drawer-breath">
                    <span className="relative z-10">{isSubmitting ? "Sending..." : (t.contactForm?.send || "Send Message")}</span>
                    {!isSubmitting && <div className="absolute top-0 bottom-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out z-0" />}
                  </button>
                  <p className="mt-6 text-center text-[9px] font-montserrat text-gray-500/70 tracking-widest uppercase">
                    * {t.contactForm?.mandatory || "Indicates a mandatory field"}
                  </p>
                </div>
              </form>
            )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
