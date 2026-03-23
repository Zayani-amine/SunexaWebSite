'use client';

import { useState, useEffect } from 'react';
import { Share2 } from 'lucide-react';

export default function Referral() {
  const [siteUrl, setSiteUrl] = useState('');

  useEffect(() => {
    setSiteUrl(window.location.origin);
  }, []);

  const shareText = `Salam! J'ai trouvé une super offre solaire avec Sunexa — agrée depuis 2012, devis gratuit en 2 min. Regarde ici: ${siteUrl}/c/ref/SHARE 🌞`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  return (
    <section className="py-24 bg-navy3 relative z-10 border-y border-gold/20 overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-gold opacity-5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <div className="flex flex-col gap-6">
            <div className="inline-block bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 w-fit">
              <span className="text-gold text-sm font-bold tracking-wide">
                💰 Programme de parrainage
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white leading-tight">
                Vous connaissez quelqu'un qui paie trop sa facture STEG ?
              </h2>
              <p className="font-noto text-gold text-xl md:text-2xl font-bold text-right py-2 opacity-90" dir="rtl">
                هل تعرف شخصاً يدفع فاتورة مرتفعة؟
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-dmsans text-gray text-lg leading-relaxed">
                Partagez le lien Sunexa avec vos amis et votre famille. Si votre contact installe le solaire avec nous, vous recevez <span className="text-white font-bold">200 TND cash</span> — sans condition, versé dès l'installation terminée.
              </p>
              <p className="font-noto text-gray2 text-right opacity-80" dir="rtl">
                شارك رابط سونيكسا مع أهلك وأصدقائك وإذا قاموا بالتركيب معنا تحصل على 200 دينار نقداً
              </p>
            </div>
          </div>

          {/* Right Reward Card */}
          <div className="relative z-10 lg:ml-auto w-full max-w-md">
            <div className="bg-navy border-2 border-gold rounded-3xl p-8 shadow-[0_0_40px_rgba(245,158,11,0.15)] flex flex-col items-center text-center">
              
              <span className="font-playfair text-7xl md:text-8xl font-black text-gold drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] leading-none mb-2">
                200
              </span>
              <span className="font-playfair text-3xl font-bold text-gold mb-1">TND</span>
              <span className="font-dmsans text-gray text-lg font-medium mb-3">par ami installé</span>
              
              <span className="font-noto text-gold-dim font-bold mb-8" dir="rtl">
                لكل صديق يركّب
              </span>

              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20BE5C] text-navy font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Partager sur WhatsApp
              </a>
              
            </div>
            {/* Decoration underneath */}
            <div className="absolute -z-10 -inset-2 bg-gradient-to-r from-gold/50 to-gold rounded-[30px] opacity-20 blur-lg" />
          </div>

        </div>
      </div>
    </section>
  );
}
