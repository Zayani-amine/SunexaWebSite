'use client';

export default function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "Remplissez le formulaire",
      time: "2 min",
      desc: "Votre consommation, votre gouvernorat, la surface de votre toit. C'est tout.",
      subtitle: "أدخل استهلاكك وموقعك ومساحة سطحك"
    },
    {
      num: "2",
      title: "Recevez votre devis",
      time: "instantané",
      desc: "Notre moteur calcule la taille idéale du système, les économies annuelles et le retour sur investissement.",
      subtitle: "احصل على عرض أسعار فوري ومخصص"
    },
    {
      num: "3",
      title: "On installe, vous économisez",
      time: "1-2 jours",
      desc: "Notre équipe agréée installe le système. Vous commencez à économiser dès le premier mois.",
      subtitle: "فريقنا يركب، وأنت تبدأ التوفير من الشهر الأول"
    }
  ];

  return (
    <section id="how-it-works-section" className="py-24 bg-navy relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white mb-4">
            Votre devis en 3 étapes simples
          </h2>
          <p className="font-noto text-gold text-xl font-bold" dir="rtl">
            عرض أسعارك في 3 خطوات بسيطة
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-[45px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-gold/10 via-gold/50 to-gold/10 z-0" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                
                {/* Circle Number */}
                <div className="w-24 h-24 rounded-full bg-navy3 border-2 border-gold flex items-center justify-center mb-8 relative shadow-[0_0_30px_rgba(245,158,11,0.1)] group-hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-shadow">
                  <span className="font-playfair text-4xl font-bold text-white">{step.num}</span>
                  <div className="absolute -bottom-3 bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    {step.time}
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-playfair text-2xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="font-dmsans text-gray mb-6 leading-relaxed max-w-sm">
                  {step.desc}
                </p>
                <p className="font-noto text-gold-dim text-sm font-bold" dir="rtl">
                  {step.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
