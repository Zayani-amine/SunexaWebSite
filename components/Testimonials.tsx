'use client';

function StarRating() {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-gold text-lg">★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const testimonials = [
    {
      quoteFR: "En 6 ans avec Sunexa, je n'ai jamais eu un problème. Ma facture STEG est passée de 280 à 45 TND par mois.",
      quoteAR: "فاتورتي انخفضت من 280 إلى 45 دينار في الشهر",
      name: "Mohamed B.",
      city: "Sfax",
      saving: "Économise 2,820 TND/an"
    },
    {
      quoteFR: "L'équipe a installé les 12 panneaux en une seule journée. Professionnels, ponctuels, et le suivi après-vente est excellent.",
      quoteAR: "ركبوا 12 لوحة في يوم واحد، محترفون ومنظمون",
      name: "Sonia K.",
      city: "Sousse",
      saving: "Économise 1,980 TND/an"
    },
    {
      quoteFR: "Le pompage solaire a transformé mon exploitation agricole. Plus de coupures, plus de gasoil, et mon puits tourne 10h/jour.",
      quoteAR: "الضخ الشمسي غيّر مزرعتي. لا انقطاع، لا مازوت",
      name: "Abderrazak M.",
      city: "Kairouan",
      saving: "Économise 4,200 TND/an (pompage)"
    }
  ];

  return (
    <section className="py-24 bg-navy relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white mb-4">
            Ce que disent nos clients
          </h2>
          <p className="font-noto text-gold text-xl font-bold" dir="rtl">
            ماذا يقول عملاؤنا
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-navy2 p-8 rounded-3xl border border-white/5 flex flex-col hover:border-white/20 transition-colors">
              <StarRating />
              
              <p className="font-dmsans text-gray italic leading-relaxed mb-6 flex-grow text-lg">
                "{t.quoteFR}"
              </p>
              
              <p className="font-noto text-gold-dim text-right font-medium mb-8" dir="rtl">
                {t.quoteAR}
              </p>

              <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy3 border border-gold flex items-center justify-center font-playfair font-bold text-gold text-sm">
                    {t.name.substring(0,2).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-white text-sm">{t.name}</span>
                    <span className="text-xs text-gray">{t.city}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 inline-flex items-center justify-center bg-success/10 text-success text-xs font-bold px-3 py-1.5 rounded-full w-fit">
                {t.saving}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
