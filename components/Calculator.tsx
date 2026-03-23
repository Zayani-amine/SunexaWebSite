'use client';

import { useState, useMemo } from 'react';

// Tunisian governorates and irradiances
const IRRADIANCE: Record<string, number> = {
  'Tunis': 5.2, 'Ariana': 5.2, 'Ben Arous': 5.2, 'Manouba': 5.2,
  'Bizerte': 5.1, 'Nabeul': 5.3, 'Zaghouan': 5.3, 'Béja': 5.0,
  'Jendouba': 4.9, 'Le Kef': 5.0, 'Siliana': 5.1, 'Sousse': 5.4,
  'Monastir': 5.4, 'Mahdia': 5.4, 'Sfax': 5.5, 'Kairouan': 5.4,
  'Kasserine': 5.3, 'Sidi Bouzid': 5.5, 'Gabès': 5.6, 'Medenine': 5.7,
  'Tataouine': 5.8, 'Gafsa': 5.7, 'Tozeur': 5.8, 'Kebili': 5.8,
};

const gouvernorats = Object.keys(IRRADIANCE).sort();

// STEG Rate Calculation for 2024
const stegRate = (kwh: number) => {
  if (kwh <= 100) return 0.081;
  if (kwh <= 200) return 0.132;
  if (kwh <= 500) return 0.215;
  return 0.352;
};

// Pure math estimation
function calculate(kwhMois: number, surfaceM2: number, gouvernorat: string) {
  const irr = IRRADIANCE[gouvernorat] ?? 5.4;
  const systemEff = 0.78;
  const kwcDemande = (kwhMois / (irr * 30 * systemEff));
  // Round up to nearest 0.25 kWp
  let kwc = Math.ceil(kwcDemande * 4) / 4;
  
  // Rule of thumb: 1 kWp needs around 5 m2. If surface is limited:
  const maxKwcSurface = Math.floor(surfaceM2 / 5);
  if (kwc > maxKwcSurface && maxKwcSurface > 0) {
    kwc = maxKwcSurface;
  }
  
  // Ensure minimum system is 1.5 kWp if sensible
  kwc = Math.max(1.5, kwc);

  const prodAn = Math.round(kwc * irr * 365 * systemEff);
  // Cap savings to current consumption if it covers more than needed
  const kwhSaved = Math.min(prodAn, kwhMois * 12);
  const econAn = Math.round(kwhSaved * stegRate(kwhMois));
  
  const coutTND_kWp = 3200; // market average 2024
  const cout = Math.round(kwc * coutTND_kWp * 1.19); // TTC
  
  const payback = Math.round((cout / Math.max(econAn, 1)) * 10) / 10;
  
  return { kwc, prodAn, econAn, cout, payback };
}

export default function Calculator() {
  const [kwh, setKwh] = useState(300);
  const [surface, setSurface] = useState(40);
  const [gov, setGov] = useState('Tunis');

  const { kwc, prodAn, econAn, cout, payback } = useMemo(() => calculate(kwh, surface, gov), [kwh, surface, gov]);

  const handleScrollToForm = () => {
    // Save to local storage to prefill form
    localStorage.setItem('sunexa_prefill_gov', gov);
    
    let consoBracket = '200–500 kWh';
    if(kwh <= 100) consoBracket = 'Moins de 100 kWh';
    else if(kwh <= 200) consoBracket = '100–200 kWh';
    else if(kwh > 500) consoBracket = 'Plus de 500 kWh';
    localStorage.setItem('sunexa_prefill_conso', consoBracket);

    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
    
    // Dispatch a custom event to notify the LeadForm to read from localStorage
    window.dispatchEvent(new Event('sunexa_prefill_ready'));
  };

  return (
    <section id="calculator-section" className="py-24 bg-navy2 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white mb-4">
            Combien allez-vous économiser ?
          </h2>
          <p className="font-noto text-gold text-xl font-bold mb-4" dir="rtl">
            كم ستوفر مع الطاقة الشمسية؟
          </p>
          <p className="font-dmsans text-gray text-lg">
            Ajustez les paramètres pour visualiser votre potentiel énergétique.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-navy3 rounded-3xl border border-gold/30 p-6 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Inputs */}
            <div className="flex flex-col gap-8">
              
              {/* Slider 1: Consommation */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-end">
                  <label className="text-white font-medium text-lg">Consommation mensuelle</label>
                  <span className="text-gold font-playfair font-bold text-2xl">{kwh} <span className="text-sm font-dmsans text-gray">kWh</span></span>
                </div>
                <input 
                  type="range" 
                  min="50" max="800" step="10" 
                  value={kwh} 
                  onChange={(e) => setKwh(parseInt(e.target.value))}
                  className="w-full h-2 bg-navy rounded-lg appearance-none cursor-pointer accent-gold"
                />
              </div>

              {/* Slider 2: Surface */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-end">
                  <label className="text-white font-medium text-lg">Surface toit disponible</label>
                  <span className="text-gold font-playfair font-bold text-2xl">{surface} <span className="text-sm font-dmsans text-gray">m²</span></span>
                </div>
                <input 
                  type="range" 
                  min="10" max="200" step="5" 
                  value={surface} 
                  onChange={(e) => setSurface(parseInt(e.target.value))}
                  className="w-full h-2 bg-navy rounded-lg appearance-none cursor-pointer accent-gold"
                />
              </div>

              {/* Select: Gouvernorat */}
              <div className="flex flex-col gap-4">
                <label className="text-white font-medium text-lg">Gouvernorat</label>
                <select 
                  value={gov}
                  onChange={(e) => setGov(e.target.value)}
                  className="w-full bg-navy border border-white/20 text-white rounded-xl px-4 py-4 appearance-none focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="" disabled>Choisir votre gouvernorat</option>
                  {gouvernorats.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Results Panel */}
            <div className="bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 blur-3xl rounded-full" />
              
              <div className="flex flex-col gap-6 relative z-10">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-gray">Système recommandé</span>
                  <span className="text-white text-2xl font-playfair font-bold">{kwc.toFixed(2)} kWc</span>
                </div>
                
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-gray">Production annuelle</span>
                  <span className="text-white text-xl font-bold">{prodAn.toLocaleString('fr-FR')} kWh/an</span>
                </div>
                
                <div className="flex justify-between items-center pb-4 border-b border-white/10 bg-success/10 p-4 -mx-4 rounded-lg">
                  <span className="text-success font-medium">Économies annuelles</span>
                  <span className="text-success text-3xl font-playfair font-bold">{econAn.toLocaleString('fr-FR')} TND/an</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray">Retour sur investissement</span>
                  <span className="text-white text-xl font-bold">{payback.toLocaleString('fr-FR')} ans</span>
                </div>
              </div>

              <div className="mt-8 relative z-10">
                <button 
                  onClick={handleScrollToForm}
                  className="w-full bg-gold hover:bg-gold2 text-navy font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg flex justify-center items-center gap-2"
                >
                  Obtenir mon devis détaillé gratuit <span className="text-xl leading-none">→</span>
                </button>
                <p className="text-center text-xs text-gray mt-4 opacity-70">
                  Estimation basée sur les tarifs STEG 2024 et l'ensoleillement de votre région
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
