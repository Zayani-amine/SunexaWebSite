'use client';

import { useEffect, useRef, useState } from 'react';

const AnimatedCounter = ({ end, duration = 1500, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          // easeOutExpo
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setCount(Math.floor(easeProgress * end));
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => observer.disconnect();
  }, [end, duration]);
  
  return <span ref={counterRef}>{count}{suffix}</span>;
};

export default function Proof() {
  return (
    <section id="proof-section" className="w-full bg-gradient-to-r from-navy3 via-navy2 to-navy3 border-y border-white/10 py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          <div className="flex flex-col items-center text-center px-4">
            <span className="font-playfair text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <AnimatedCounter end={200} suffix="+" />
            </span>
            <span className="font-dmsans text-gold uppercase tracking-wider text-sm font-bold mb-1">Installations réalisées</span>
            <span className="font-noto text-gray2 text-xs" dir="rtl">تركيب</span>
          </div>

          <div className="flex flex-col items-center text-center px-4 pt-12 md:pt-0">
            <span className="font-playfair text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <AnimatedCounter end={12} />
            </span>
            <span className="font-dmsans text-gold uppercase tracking-wider text-sm font-bold mb-1">Ans d'expérience</span>
            <span className="font-noto text-gray2 text-xs" dir="rtl">سنة خبرة</span>
          </div>

          <div className="flex flex-col items-center text-center px-4 pt-12 md:pt-0">
            <span className="font-playfair text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <AnimatedCounter end={24} />
            </span>
            <span className="font-dmsans text-gold uppercase tracking-wider text-sm font-bold mb-1">Gouvernorats couverts</span>
            <span className="font-noto text-gray2 text-xs" dir="rtl">ولاية</span>
          </div>

          <div className="flex flex-col items-center text-center px-4 pt-12 md:pt-0">
            <span className="font-playfair text-4xl md:text-5xl font-bold text-success mb-2 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <AnimatedCounter end={25} suffix=" Ans" />
            </span>
            <span className="font-dmsans text-gold uppercase tracking-wider text-sm font-bold mb-1">Performance Garantie</span>
            <span className="font-noto text-gray2 text-xs" dir="rtl">ضمان الأداء</span>
          </div>

        </div>
      </div>
    </section>
  );
}
