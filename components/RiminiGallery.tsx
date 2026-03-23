'use client';

import { useState, useEffect } from 'react';
import { Phone, Mail, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  '/hero/WhatsApp Image 2026-03-23 at 10.00.45 AM.jpeg',
  '/hero/WhatsApp Image 2026-03-23 at 10.00.48 AM (1).jpeg',
  '/hero/WhatsApp Image 2026-03-23 at 10.00.48 AM (2).jpeg',
  '/hero/WhatsApp Image 2026-03-23 at 10.00.48 AM.jpeg',
  '/hero/WhatsApp Image 2026-03-23 at 11.44.35 AM.jpeg',
  '/hero/WhatsApp Image 2026-03-23 at 11.44.36 AM (1).jpeg',
  '/hero/WhatsApp Image 2026-03-23 at 11.44.36 AM (2).jpeg',
  '/hero/WhatsApp Image 2026-03-23 at 11.44.36 AM (3).jpeg',
  '/hero/WhatsApp Image 2026-03-23 at 11.44.36 AM.jpeg',
  '/hero/WhatsApp Image 2026-03-23 at 11.47.25 AM (1).jpeg',
  '/hero/WhatsApp Image 2026-03-23 at 11.47.25 AM (2).jpeg',
  '/hero/WhatsApp Image 2026-03-23 at 11.47.25 AM.jpeg',
];

export default function RiminiGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, []);

  const whatsappLink = "https://wa.me/21658582913"; // Using one of the primary numbers

  return (
    <section className="py-24 bg-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wider">
            Nos Projets et Actualités
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6" />
          <p className="text-gray max-w-2xl mx-auto">
            Découvrez nos dernières installations et notre participation aux événements majeurs du secteur solaire.
          </p>
        </div>

        {/* Gallery Slider */}
        <div className="relative group max-w-4xl mx-auto h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.15)] border border-white/10 bg-navy3/50">
          {galleryImages.map((img, idx) => (
            <div
              key={img}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out flex items-center justify-center ${idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}
            >
              {/* Blurred background for a premium feel without cropping */}
              <div 
                className="absolute inset-0 blur-2xl opacity-20 scale-110"
                style={{ backgroundImage: `url('${img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <img src={img} alt={`Projet ${idx}`} className="relative z-10 max-w-full max-h-full object-contain shadow-2xl" />
            </div>
          ))}

          {/* Controls */}
          <button 
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-gold transition-colors p-3 rounded-full text-white z-20 backdrop-blur-md border border-white/10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-gold transition-colors p-3 rounded-full text-white z-20 backdrop-blur-md border border-white/10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {galleryImages.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-gold w-6' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6">
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-gold hover:bg-gold2 transition-all px-8 py-4 rounded-xl text-navy font-bold shadow-lg hover:scale-105 active:scale-95 text-lg"
          >
            <Phone className="w-5 h-5" />
            Contactez-nous sur WhatsApp
          </a>
          <a 
            href="mailto:contact@ge-energie.com"
            className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/20 transition-all px-8 py-4 rounded-xl text-white font-bold shadow-lg hover:scale-105 active:scale-95 text-lg"
          >
            <Mail className="w-5 h-5 text-gold" />
            contact@ge-energie.com
          </a>
        </div>

      </div>
    </section>
  );
}
