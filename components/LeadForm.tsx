'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LeadForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [gov, setGov] = useState('');
  const [conso, setConso] = useState('');
  const [projet, setProjet] = useState('Résidentiel');
  const [connu, setConnu] = useState('');

  const gouvernorats = [
    'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba', 'Kairouan',
    'Kasserine', 'Kebili', 'Le Kef', 'Mahdia', 'Manouba', 'Medenine', 'Monastir', 'Nabeul',
    'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
  ];

  useEffect(() => {
    // Read from calculator prefill
    const handlePrefill = () => {
      const storedGov = localStorage.getItem('sunexa_prefill_gov');
      const storedConso = localStorage.getItem('sunexa_prefill_conso');
      if (storedGov) setGov(storedGov);
      if (storedConso) setConso(storedConso);
    };

    window.addEventListener('sunexa_prefill_ready', handlePrefill);
    return () => window.removeEventListener('sunexa_prefill_ready', handlePrefill);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Get tracking data
    const source = localStorage.getItem('sunexa_src') || 'direct';
    const referrer = localStorage.getItem('sunexa_ref') || null;

    try {
      // Track Form Submit
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionStorage.getItem('sunexa_sid') || 'unknown',
          event_type: 'form_submit',
          source,
          gouvernorat: gov,
          referrer_code: referrer
        })
      });

      // Submit Lead
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom, telephone, gouvernorat: gov, conso_kwh_mois: conso,
          type_projet: projet, source_campaign: source,
          referrer_code: referrer, comment_connu: connu
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.details || data.error || 'Erreur lors de la soumission');
      }

      // Generate partial lead id for referral sharing

      const leadIdLast6 = data.id ? data.id.slice(-6) : telephone.slice(-6);

      // Redirect
      router.push(`/merci?ref=${leadIdLast6}&n=${encodeURIComponent(nom)}`);

    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue, veuillez réessayer.');
      setLoading(false);
    }
  };

  return (
    <section id="form-section" className="py-24 bg-navy2 relative z-10 w-full flex flex-col items-center">

      {/* Urgency Banner */}
      <div className="bg-gold/10 border border-gold/30 rounded-xl px-6 py-4 mb-12 max-w-3xl text-center shadow-[0_0_20px_rgba(245,158,11,0.15)] mx-6">
        <p className="text-gold font-bold">
          ⚡ Les prix des équipements augmentent en 2025 — obtenez votre devis aux tarifs actuels.
        </p>
      </div>

      <div className="bg-navy3 rounded-3xl border border-gold/40 p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.6)] w-full max-w-2xl mx-6">
        <div className="text-center mb-10">
          <h2 className="font-playfair text-3xl font-bold text-white mb-2">
            Obtenez votre devis gratuit maintenant
          </h2>
          <p className="font-noto text-sm text-white" dir="rtl">دقيقتان. مجاناً. بدون التزام. فريقنا سيتصل بك خلال 30 دقيقة</p>
          <p className="text-gray text-sm mt-2">2 minutes. Gratuit. Sans engagement. Notre équipe vous rappelle sous 30 minutes.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray font-medium">Prénom et Nom *</label>
              <input required type="text" value={nom} onChange={e => setNom(e.target.value)} className="w-full bg-navy border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray font-medium">Téléphone *</label>
              <input required type="tel" placeholder="2X XXX XXX" value={telephone} onChange={e => setTelephone(e.target.value)} className="w-full bg-navy border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray font-medium">Gouvernorat *</label>
              <select required value={gov} onChange={e => setGov(e.target.value)} className="w-full bg-navy border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors appearance-none">
                <option value="" disabled>Sélectionner...</option>
                {gouvernorats.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray font-medium">Consommation & Facture STEG</label>
              <select required value={conso} onChange={e => setConso(e.target.value)} className="w-full bg-navy border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors appearance-none">
                <option value="" disabled>{"Sélectionner votre profil..."}</option>
                <option value="Faible (< 200 kWh / < 50 TND)">{"Faible (< 200 kWh / < 50 TND)"}</option>
                <option value="Moyenne (200–500 kWh / 50–150 TND)">{"Moyenne (200–500 kWh / 50–150 TND)"}</option>
                <option value="Élevée (500–800 kWh / 150–300 TND)">{"Élevée (500–800 kWh / 150–300 TND)"}</option>
                <option value="Trés Élevée (> 800 kWh / +300 TND)">{"Trés Élevée (> 800 kWh / +300 TND)"}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray font-medium">Type de projet</label>
              <select required value={projet} onChange={e => setProjet(e.target.value)} className="w-full bg-navy border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors appearance-none">
                <option value="Résidentiel">Résidentiel</option>
                <option value="Commercial">Commercial</option>
                <option value="Pompage">Pompage solaire</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray font-medium">Comment nous avez-vous connu?</label>
              <select value={connu} onChange={e => setConnu(e.target.value)} className="w-full bg-navy border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors appearance-none">
                <option value="" disabled>Sélectionner...</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Recommandation">Recommandation (Ami)</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold hover:bg-gold2 text-navy font-bold py-4 rounded-xl mt-4 transition-all hover:scale-[1.02] shadow-lg flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-navy border-t-transparent rounded-full animate-spin" />
            ) : (
              <>Recevoir mon devis gratuit <span className="text-xl leading-none">→</span></>
            )}
          </button>
        </form>

        <div className="flex flex-wrap justify-between items-center mt-8 pt-6 border-t border-white/10 gap-4 text-xs text-gray">
          <span className="flex items-center gap-1">✓ Devis 100% gratuit</span>
          <span className="flex items-center gap-1">✓ Aucun engagement</span>
          <span className="flex items-center gap-1">✓ Rappel sous 30 min</span>
          <span className="flex items-center gap-1 text-gold">✓ Agréé depuis 2012</span>
        </div>
      </div>
    </section>
  );
}
