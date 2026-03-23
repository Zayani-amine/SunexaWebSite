'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Facebook } from 'lucide-react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToForm = () => {
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-navy/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
        <div className="flex flex-col">
          <Link href="/" className="block outline-none focus:ring-2 focus:ring-gold rounded-lg transition-transform hover:scale-105 active:scale-95">
            <img src="/logo.png" alt="SUNEXA Logo" className="h-12 md:h-16 w-auto object-contain" />
          </Link>
          <span className="text-gray text-[10px] tracking-widest uppercase hidden md:block mt-1 font-medium opacity-80">
            Agréé depuis 2012
          </span>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-white border-r border-white/20 pr-6 mr-2">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold" />
              <span className="font-dmsans font-medium text-sm tracking-wide">
                58 582 913 / 58 582 915
              </span>
            </div>
            <a 
              href="https://www.facebook.com/share/1HwpRx6hwD/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 active:scale-90 transition-all text-[#1877F2] hover:text-white"
              title="Suivez-nous sur Facebook"
            >
              <Facebook className="w-6 h-6 drop-shadow-[0_0_8px_rgba(24,119,242,0.3)]" />
            </a>
          </div>
          <button 
            onClick={handleScrollToForm}
            className="bg-gold hover:bg-gold2 transition-all text-navy font-bold px-7 py-2.5 rounded-full text-sm tracking-wide shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] active:scale-95"
          >
            Devis gratuit
          </button>
        </div>
      </div>
    </nav>
  );
}
