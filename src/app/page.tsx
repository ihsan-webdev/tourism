'use client';

import Header from '@/components/public/Header';
import Hero from '@/components/public/Hero';
import Destinations from '@/components/public/Destinations';
import Experiences from '@/components/public/Experiences';
import About from '@/components/public/About';
import Gallery from '@/components/public/Gallery';
import Testimonials from '@/components/public/Testimonials';
import Footer from '@/components/public/Footer';
import BackToTop from '@/components/ui/BackToTop';
import ScrollProgress from '@/components/ui/ScrollProgress';

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <Header />
      <Hero />
      <Destinations />
      <About />
      <Experiences />
      <Gallery />
      <Testimonials />
      <Footer />
      <BackToTop />
    </main>
  );
}
