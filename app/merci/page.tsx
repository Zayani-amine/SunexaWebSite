'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, Share2, Copy, Check } from 'lucide-react';

function MerciContent() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref') || 'SHARE';
  const nom = searchParams.get('n') || '';

  const [siteUrl, setSiteUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSiteUrl(window.location.origin);
  }, []);

  const referralLink = `${siteUrl}/c/ref/${refCode}`;
  const shareText = `Salam! J'ai trouvé Sunexa pour le solaire — agréé depuis 2012, devis gratuit en 2 min 👉 ${referralLink} 🌞`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center max-w-3xl mx-auto gap-8">
      
      {/* Success Anim */}
      <div className="relative">
        <div className="absolute inset-0 bg-gold blur-3xl opacity-20 rounded-full" />
        <CheckCircle2 className="w-24 h-24 text-gold relative z-10 mx-auto" strokeWidth={1.5} />
      </div>

      <div>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
          Merci {nom ? `${decodeURIComponent(nom)} ` : ''}! Votre demande est bien reçue. 🌞
        </h1>
        <p className="font-noto text-gold text-2xl font-bold mb-4" dir="rtl">
          فريق سونيكسا سيتصل بك خلال 30 دقيقة
        </p>
        <p className="font-dmsans text-gray text-lg">
          Notre équipe Sunexa vous contacte dans les 30 prochaines minutes pour finaliser votre devis.
        </p>
      </div>

      {/* Referral Block */}
      <div className="bg-navy3 border border-gold/40 rounded-3xl p-8 w-full shadow-[0_0_30px_rgba(245,158,11,0.1)] mt-4">
        <h2 className="font-playfair text-2xl font-bold text-white mb-2">Gagnez 200 TND — Parrainez un ami</h2>
        <p className="text-gray text-sm mb-6">
          Pour chaque ami qui installe avec Sunexa grâce à votre lien, vous recevez 200 TND cash.
        </p>
        
        <div className="flex flex-col gap-2 mb-6 text-left">
          <label className="text-sm font-medium text-gray">Votre lien personnel de parrainage:</label>
          <div className="flex bg-navy border border-white/20 rounded-xl overflow-hidden">
            <input 
              readOnly 
              value={referralLink} 
              className="flex-grow bg-transparent px-4 py-3 text-white outline-none font-mono text-sm" 
            />
            <button 
              onClick={handleCopy}
              className="bg-white/10 hover:bg-white/20 px-4 flex items-center gap-2 text-white font-medium transition-colors border-l border-white/20"
            >
              {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copié' : 'Copier'}
            </button>
          </div>
        </div>

        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noreferrer"
          className="w-full bg-[#25D366] hover:bg-[#20BE5C] text-navy font-bold py-3 rounded-xl transition-all flex justify-center items-center gap-2 mb-2"
        >
          <Share2 className="w-5 h-5" />
          Partager sur WhatsApp
        </a>
      </div>

      <div className="flex gap-4 items-center justify-center mt-4">
        <Link href="/" className="text-gold hover:underline text-sm font-bold">
          ← Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

export default function Merci() {
  return (
    <main className="min-h-screen pt-20 pb-12">
      <Suspense fallback={<div className="text-center text-white mt-20">Chargement...</div>}>
        <MerciContent />
      </Suspense>
    </main>
  );
}
