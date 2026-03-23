"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const heroImages = [
  "/WhatsApp Image 2026-03-23 at 11.44.35 AM.jpeg",
  "/WhatsApp Image 2026-03-23 at 11.44.36 AM (1).jpeg",
  "/WhatsApp Image 2026-03-23 at 11.44.36 AM (2).jpeg",
  "/WhatsApp Image 2026-03-23 at 11.44.36 AM (3).jpeg",
  "/WhatsApp Image 2026-03-23 at 11.44.36 AM.jpeg",
];

const participationImages = [
  "/WhatsApp Image 2026-03-23 at 10.00.45 AM.jpeg",
  "/WhatsApp Image 2026-03-23 at 10.00.48 AM (1).jpeg",
  "/WhatsApp Image 2026-03-23 at 10.00.48 AM (2).jpeg",
  "/WhatsApp Image 2026-03-23 at 10.00.48 AM.jpeg",
];

const otherImages = [
  "/WhatsApp Image 2026-03-23 at 11.47.25 AM (1).jpeg",
  "/WhatsApp Image 2026-03-23 at 11.47.25 AM (2).jpeg",
  "/WhatsApp Image 2026-03-23 at 11.47.25 AM.jpeg",
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">GE</span>
            </div>
            <span className="text-white font-bold text-xl">GE Energie</span>
          </div>
          <div className="hidden md:flex gap-8 text-gray-300">
            <a href="#accueil" className="hover:text-orange-400 transition">Accueil</a>
            <a href="#services" className="hover:text-orange-400 transition">Services</a>
            <a href="#participation" className="hover:text-orange-400 transition">Participation</a>
            <a href="#contact" className="hover:text-orange-400 transition">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-orange-400 text-sm hidden sm:block">contact@ge-energie.com</span>
          </div>
        </div>
      </nav>

      {/* Hero Section with Slider */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Slider */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-40" : "opacity-0"
              }`}
            >
              <Image
                src={img}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

        {/* Floating Orange Grid Panel */}
        <div className="absolute top-1/4 right-10 w-64 h-64 hidden lg:block z-10">
          <div className="relative w-full h-full animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-orange-600/20 backdrop-blur-sm rounded-2xl border border-orange-500/30">
              <div className="grid grid-cols-4 gap-1 p-4 h-full">
                {[...Array(16)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-orange-500/40 to-orange-600/20 rounded-sm hover:from-orange-500/60 hover:to-orange-600/40 transition-all duration-300"
                  />
                ))}
              </div>
            </div>
            <div className="absolute -inset-1 bg-orange-500/10 rounded-3xl blur-xl" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              GE Energie
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Solutions énergétiques innovantes pour un avenir durable
          </p>
          <p className="text-lg text-gray-400 mb-8">
            Leader dans les solutions d&apos;énergie solaire et renouvelable en Tunisie
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
            >
              Contactez-nous
            </a>
            <a
              href="#services"
              className="px-8 py-4 border-2 border-orange-500 text-orange-400 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all"
            >
              Nos Services
            </a>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-orange-500 scale-125"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Nos Services
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Des solutions complètes pour vos besoins énergétiques
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Panneaux Solaires",
                desc: "Installation et maintenance de panneaux solaires haute performance",
                icon: "☀️",
              },
              {
                title: "Solutions Photovoltaïques",
                desc: "Systèmes photovoltaïques adaptés à vos besoins résidentiels et industriels",
                icon: "🔌",
              },
              {
                title: "Audit Énergétique",
                desc: "Analyse complète de votre consommation et recommandations personnalisées",
                icon: "📊",
              },
              {
                title: "Maintenance Préventive",
                desc: "Service de maintenance régulière pour optimiser vos installations",
                icon: "🔧",
              },
              {
                title: "Éclairage Solaire",
                desc: "Solutions d&apos;éclairage solaire pour espaces publics et privés",
                icon: "💡",
              },
              {
                title: "Pompes Solaires",
                desc: "Systèmes de pompage solaire pour l&apos;agriculture et l&apos;industrie",
                icon: "💧",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-orange-400 transition">
                  {service.title}
                </h3>
                <p className="text-gray-400">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Participation Section - RIMINI ITALIE */}
      <section id="participation" className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Notre Participation
            </span>
          </h2>
          <p className="text-2xl text-orange-400 text-center mb-2 font-semibold">
            RIMINI, ITALIE
          </p>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Découvrez notre présence aux événements internationaux
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {participationImages.map((img, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={img}
                  alt={`Participation RIMINI ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold">Rimini, Italie</p>
                  <p className="text-orange-400 text-sm">Événement {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Gallery */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Nos Réalisations
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {otherImages.map((img, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-2xl overflow-hidden group"
              >
                <Image
                  src={img}
                  alt={`Réalisation ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Contactez-nous
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-6">Informations de Contact</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Téléphone</p>
                    <p className="text-white font-semibold">58582913 / 58582915</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-semibold">contact@ge-energie.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Adresse</p>
                    <p className="text-white font-semibold">Tunisie</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 p-8 rounded-2xl border border-orange-500/30">
              <h3 className="text-xl font-semibold text-white mb-6">Demande de Devis</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Nom complet"
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition"
                />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition"
                />
                <textarea
                  placeholder="Message"
                  rows={3}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30"
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GE</span>
            </div>
            <span className="text-white font-semibold">GE Energie</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2026 GE Energie. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <a href="tel:58582913" className="text-gray-400 hover:text-orange-400 transition">58582913</a>
            <a href="tel:58582915" className="text-gray-400 hover:text-orange-400 transition">58582915</a>
          </div>
        </div>
      </footer>
    </div>
  );
}