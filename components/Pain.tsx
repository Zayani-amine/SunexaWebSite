'use client';

export default function Pain() {
  const cards = [
    {
      icon: "💡",
      title: "Facture qui explose",
      subtitle: "أسعار الكهرباء ترتفع سنة بعد سنة",
      desc: "Les tarifs STEG augmentent chaque année. En 2024, les ménages consommant 200–500 kWh payent 0.215 TND/kWh et ça ne va qu'augmenter."
    },
    {
      icon: "☀️",
      title: "5.4h de soleil/jour",
      subtitle: "سطح منزلك محطة كهرباء نائمة",
      desc: "Avec une des meilleures irradiances de la région méditerranéenne, votre toit est une centrale électrique qui dort."
    },
    {
      icon: "📉",
      title: "Prix solaire -70% en 10 ans",
      subtitle: "أسعار الطاقة الشمسية انخفضت 70% في 10 سنوات",
      desc: "Le coût d'une installation PV a baissé de 70% en 10 ans. 2024 est la meilleure année pour passer au solaire."
    },
    {
      icon: "🏆",
      title: "Agréée depuis 2012",
      subtitle: "من أوائل الشركات المعتمدة في تونس منذ 2012",
      desc: "Parmi les tout premiers installateurs PV certifiés en Tunisie. 12 ans d'expérience, des centaines d'installations, garantie totale."
    }
  ];

  return (
    <section id="pain-section" className="py-24 bg-navy2 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16 max-w-2xl">
          <span className="text-gold uppercase tracking-widest text-xs font-bold">POURQUOI SUNEXA</span>
          <div>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white mb-2 text-balance leading-tight">
              Votre facture STEG augmente chaque année.
            </h2>
            <p className="font-noto text-gold text-lg md:text-xl font-bold text-right py-2 opacity-90" dir="rtl">
              فاتورة الكهرباء ترتفع كل عام
            </p>
          </div>
          <p className="font-dmsans text-gray text-lg">
            Vos voisins ont déjà trouvé la solution. Rejoignez les +200 familles tunisiennes qui produisent leur propre électricité.
          </p>
        </div>

        {/* Pain Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div 
              key={idx}
              className="bg-navy3 p-8 rounded-2xl border border-white/5 hover:border-gold transition-colors duration-300 group flex flex-col h-full relative overflow-hidden"
            >
              <div className="text-4xl mb-6 bg-navy2 w-16 h-16 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <h3 className="font-playfair font-bold text-xl text-white mb-3">
                {card.title}
              </h3>
              <p className="font-dmsans text-gray flex-grow leading-relaxed mb-6">
                {card.desc}
              </p>
              
              <div className="mt-auto pt-4 border-t border-white/5">
                <p className="font-noto text-gold text-sm text-right font-medium opacity-80 group-hover:opacity-100 transition-opacity" dir="rtl">
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
