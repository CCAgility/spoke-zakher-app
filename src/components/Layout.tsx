import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Instagram, Mail, Phone } from 'lucide-react';
import { cn } from '../lib/utils';
import { AIChat } from './AIChat';

export function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'The Villa', path: '/the-villa' },
    { name: 'Amenities', path: '/amenities' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'Contact', path: '/contact' },
  ];

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      {/* Navigation */}
      <header 
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300 border-b",
          isScrolled || !isHome || mobileMenuOpen
            ? "bg-white border-gray-200 py-4" 
            : "bg-transparent border-transparent py-6 text-white"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="font-serif text-2xl tracking-widest uppercase z-50 relative">
            Casa Estrella
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={cn(
                  "text-sm font-medium tracking-widest uppercase hover:opacity-70 transition-opacity",
                  location.pathname === link.path && "border-b-2 border-current pb-1"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/contact" 
              className={cn(
                "px-6 py-2 text-sm font-bold tracking-widest uppercase border transition-colors",
                isScrolled || !isHome
                  ? "border-black bg-black text-white hover:bg-white hover:text-black"
                  : "border-white bg-white text-black hover:bg-transparent hover:text-white"
              )}
            >
              Reserve
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-50 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} className="text-black" /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div className={cn(
          "fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-transform duration-300 md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <nav className="flex flex-col items-center gap-8 text-black">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className="text-xl font-serif tracking-widest uppercase"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h2 className="font-serif text-3xl tracking-widest uppercase mb-6">Casa Estrella</h2>
            <p className="text-gray-400 max-w-sm leading-relaxed mb-8">
              A sanctuary of colonial architecture and modern tranquility in the heart of Cartagena's historic walled city.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="mailto:Reservas@grupozakher.com" className="text-gray-400 hover:text-white transition-colors"><Mail size={20} /></a>
              <a href="tel:+573148182656" className="text-gray-400 hover:text-white transition-colors"><Phone size={20} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold tracking-widest uppercase text-sm mb-6">Explore</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/the-villa" className="hover:text-white transition-colors">The Villa</Link></li>
              <li><Link to="/amenities" className="hover:text-white transition-colors">Amenities</Link></li>
              <li><Link to="/experiences" className="hover:text-white transition-colors">Experiences</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold tracking-widest uppercase text-sm mb-6">Contact</h3>
            <ul className="space-y-4 text-gray-400">
              <li>Reservas@grupozakher.com</li>
              <li>+57 314 818 2656</li>
              <li>+57 305 299 9971</li>
              <li>Cartagena de Indias, Colombia</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Casa Estrella de San Pedro. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>

      {/* Global AI Chat */}
      <AIChat />
    </div>
  );
}