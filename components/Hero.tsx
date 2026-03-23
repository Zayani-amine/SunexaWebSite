'use client';

import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import SolarPanel3D from './SolarPanel3D';

const heroImages = [
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

export default function Hero() {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollToForm = () => {
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-navy">
      
      {/* Image Slider Background */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, idx) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentImg ? 'opacity-30' : 'opacity-0'}`}
            style={{
              backgroundImage: `url('${img}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-navy/60" />
      </div>

      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-50">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#F59E0B" />
          <SolarPanel3D />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Content Layer */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center gap-8">
        
        <div className="flex flex-col gap-4 max-w-4xl">
          <h1 className="font-playfair text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight text-balance">
            Arrêtez de payer <span className="text-gold">STEG</span>,<br />
            Commencez à produire.
          </h1>
          <h2 className="font-noto text-3xl md:text-5xl text-gold font-bold" dir="rtl">
            سونيكسا: طاقة شمسية ذكية واقتصاد مضمون
          </h2>
          <p className="font-dmsans text-gray text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mt-4">
            GE-ENERGIE (SUNEXA) : Agréé depuis 2012. Installation photovoltaïque premium pour maisons, entreprises et pompage agricole.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
          <button 
            onClick={handleScrollToForm}
            className="group bg-gold hover:bg-gold2 transition-all text-navy font-bold px-10 py-5 rounded-full text-lg shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95"
          >
            Obtenez votre devis gratuit <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

      </div>

      {/* Scrolling Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-20">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gold to-transparent" />
        <span className="text-[10px] text-gray uppercase tracking-[0.2em]">Scroll</span>
      </div>

      {/* Radial Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 blur-[120px] rounded-full pointer-events-none z-0" />
    </section>
  );
}
