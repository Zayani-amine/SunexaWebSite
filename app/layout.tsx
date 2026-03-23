import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, Noto_Sans_Arabic } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['700', '900'],
  display: 'swap',
});

const dmsans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dmsans',
  weight: ['300', '400', '500'],
  display: 'swap',
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-arabic',
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sunexa — Installation Solaire en Tunisie | Devis Gratuit',
  description: 'Sunexa, agréé depuis 2012, parmi les premiers installateurs PV en Tunisie. Devis gratuit en 2 minutes. Résidentiel, commercial et pompage solaire dans toute la Tunisie.',
  openGraph: {
    title: 'Sunexa — Devis Solaire Gratuit en 2 Minutes',
    description: 'Économisez jusqu\'à 180 TND/mois sur votre facture STEG.',
    locale: 'fr_TN',
    type: 'website',
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${playfair.variable} ${dmsans.variable} ${notoArabic.variable}`}>
      <body suppressHydrationWarning className="font-dmsans antialiased bg-navy text-white min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
