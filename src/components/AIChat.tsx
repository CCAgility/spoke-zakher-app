// @ts-nocheck — Legacy Vite component, not used by Next.js App Router
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, X, MessageSquare, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const LANGUAGES = [
  { code: 'en', name: 'English', welcome: 'Welcome to Casa Estrella de San Pedro. I am your AI Concierge. How may I assist you?', tooltip: 'Have questions? Ask our AI Concierge!' },
  { code: 'es', name: 'EspaÃ±ol', welcome: 'Bienvenido a Casa Estrella de San Pedro. Soy su conserje de IA. Â¿CÃ³mo puedo ayudarle?', tooltip: 'Â¿Tiene preguntas? Â¡Pregunte a nuestro conserje de IA!' },
  { code: 'pt', name: 'PortuguÃªs', welcome: 'Bem-vindo Ã  Casa Estrella de San Pedro. Sou seu concierge de IA. Como posso ajudar?', tooltip: 'Tem dÃºvidas? Pergunte ao nosso concierge de IA!' },
  { code: 'fr', name: 'FranÃ§ais', welcome: 'Bienvenue Ã  la Casa Estrella de San Pedro. Je suis votre concierge IA. Comment puis-je vous aider ?', tooltip: 'Des questions ? Demandez Ã  notre concierge IA !' }
];

const getSystemInstruction = (langName: string) => `You are the AI Concierge for Casa Estrella de San Pedro, a luxury 7-bedroom colonial villa located inside the walled city of Cartagena de Indias, Colombia.
Your goal is to assist potential guests, answer questions about the property, and encourage them to book.
Be polite, luxurious, helpful, and concise.

CRITICAL INSTRUCTION: You MUST communicate with the user in ${langName}. If they speak to you in another language, you may acknowledge it, but your primary configured language is ${langName}.

Property Knowledge Base (FAQs):
- Location: Inside the historic walled city of Cartagena de Indias, Colombia.
- Capacity: 7 luxurious en-suite bedrooms, maximum 14 guests.
- Bathrooms: 8 spa-like bathrooms.
- Size: 10,000 sq ft of living space.
- Amenities: Main private pool, intimate mini pool, rooftop bar with panoramic views, outdoor dining table, high-speed WiFi, complimentary toiletries.
- Staff & Services: 24/7 security (dedicated personnel 6 PM - 7 AM), complimentary daily housekeeping and turndown service.
- Premium Add-ons (Extra Fee): Private chef for gourmet dining, on-site massage and yoga, private airport transfers, bespoke bartender services.
- Check-in/Check-out: Standard times apply, flexible upon request.
- Vibe: Colonial grandeur meets modern luxury. Perfect for families, bachelors, bachelorettes, and corporate retreats.
- Contact: Reservas@grupozakher.com, +57 3148182656 or +57 3052999971.

If asked something you don't know, politely offer the contact email/phone.`;

export function AIChat({ lang = 'en' }: { lang?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: currentLang.welcome }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  useEffect(() => {
    // Reset chat with new language welcome message when language changes
    setMessages([{ role: 'model', text: currentLang.welcome }]);
  }, [lang, currentLang.welcome]);

  useEffect(() => {
    // Show tooltip after 3 seconds to draw attention
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTooltip(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
    }
  }, [isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const historyText = messages.map(m => `${m.role === 'user' ? 'Guest' : 'Concierge'}: ${m.text}`).join('\n');
      const prompt = `${historyText}\nGuest: ${userText}\nConcierge:`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: getSystemInstruction(currentLang.name),
          temperature: 0.7,
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || 'I apologize, but I am having trouble connecting right now.' }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'I apologize, but I am having trouble connecting right now. Please try again later or contact us directly.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const themeStyles = {
    button: 'bg-black text-white rounded-full shadow-2xl hover:bg-gray-800 transition-colors relative',
    window: 'border border-gray-200 bg-white rounded-2xl shadow-2xl overflow-hidden',
    header: 'bg-black text-white font-serif tracking-widest uppercase text-sm',
    userMsg: 'bg-black text-white rounded-2xl rounded-tr-sm',
    modelMsg: 'bg-gray-100 text-gray-900 rounded-2xl rounded-tl-sm',
    input: 'border border-gray-200 rounded-xl focus:ring-1 focus:ring-black focus:outline-none bg-gray-50',
    sendBtn: 'bg-black text-white rounded-xl hover:bg-gray-800'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn("w-80 sm:w-96 h-[500px] mb-4 flex flex-col origin-bottom-right", themeStyles.window)}
          >
            <div className={cn("p-4 flex justify-between items-center", themeStyles.header)}>
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-medium">AI Concierge</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md border border-white/20">
                  <Globe size={14} />
                  <span className="text-white text-xs font-sans">{currentLang.name}</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:opacity-70">
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-opacity-50">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div className={cn(
                    "max-w-[80%] p-3 text-sm leading-relaxed",
                    msg.role === 'user' ? themeStyles.userMsg : themeStyles.modelMsg
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className={cn("max-w-[80%] p-3 text-sm", themeStyles.modelMsg)}>
                    <span className="animate-pulse">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-3 border-t border-gray-100/20 bg-white/50 backdrop-blur-sm flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the villa..."
                className={cn("flex-1 px-4 py-2 text-sm", themeStyles.input)}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={cn("p-2 flex items-center justify-center disabled:opacity-50", themeStyles.sendBtn)}
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute bottom-full right-0 mb-4 w-48 bg-white text-gray-800 p-3 rounded-2xl shadow-xl border border-gray-200 text-sm font-medium z-50 origin-bottom-right"
            >
              <div className="relative">
                {currentLang.tooltip}
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }} 
                  className="absolute -top-1 -right-1 text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
                {/* Triangle pointer */}
                <div className="absolute -bottom-5 right-4 w-3 h-3 bg-white border-b border-r border-gray-200 transform rotate-45"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn("p-4 flex items-center justify-center relative z-10", themeStyles.button)}
        >
          {/* Subtle pulse ring to draw attention */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-black opacity-20 animate-ping"></span>
          )}
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>
    </div>
  );
}