import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Pain from '@/components/Pain';
import Proof from '@/components/Proof';
import HowItWorks from '@/components/HowItWorks';
import Calculator from '@/components/Calculator';
import Testimonials from '@/components/Testimonials';
import Referral from '@/components/Referral';
import RiminiGallery from '@/components/RiminiGallery';
import LeadForm from '@/components/LeadForm';
import { Footer, FloatingWhatsApp } from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Nav />
      <Hero />
      <Pain />
      <Proof />
      <HowItWorks />
      <Calculator />
      <Testimonials />
      <Referral />
      <RiminiGallery />
      <LeadForm />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
