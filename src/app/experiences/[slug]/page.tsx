'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Clock, Users, Check, ArrowLeft, Share2, Heart,
  Phone, MessageCircle, Star, ChevronRight, Zap
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export default function ExperienceDetail() {
  const params = useParams();
  const { experiences, settings } = useAppStore();

  const experience = experiences.find(e => e.slug === params.slug);

  if (!experience) {
    notFound();
  }

  // WhatsApp message template
  const waNumber = settings.contact.phone.replace(/[^0-9]/g, '');
  const waMessage = encodeURIComponent(
    `Halo, saya tertarik dengan pengalaman *${experience.name}*.\n\n` +
    `⏰ Durasi: ${experience.duration}\n` +
    `💪 Tingkat Kesulitan: ${experience.difficulty}\n` +
    `💰 Harga: ${formatPrice(experience.price)}\n\n` +
    `Mohon informasi lebih lanjut mengenai:\n` +
    `- Jadwal ketersediaan\n` +
    `- Persyaratan peserta\n` +
    `- Cara pemesanan\n\n` +
    `Terima kasih! 🙏`
  );
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  // Demo image
  const demoImage = '1544551763-46a013bb70d5';

  return (
    <main className="min-h-screen bg-light-bg">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-${demoImage}?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-24 left-0 right-0">
          <div className="container-custom">
            <nav className="flex items-center gap-2 text-white/70 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link href="/experiences" className="hover:text-white transition-colors">Experiences</Link>
              <ChevronRight size={14} />
              <span className="text-white">{experience.name}</span>
            </nav>
          </div>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 pb-8">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="inline-block px-4 py-1 text-sm font-medium bg-primary-gold text-dark-bg rounded-full">
                  {experience.category}
                </span>
                <span className={`inline-block px-4 py-1 text-sm font-medium rounded-full ${experience.difficulty === 'Easy' ? 'bg-green-500 text-white' :
                    experience.difficulty === 'Challenging' ? 'bg-orange-500 text-white' :
                      'bg-yellow-500 text-dark-bg'
                  }`}>
                  {experience.difficulty}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
                {experience.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span>Max {experience.maxParticipants} peserta</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
              >
                <h2 className="text-2xl font-playfair font-bold text-dark-bg mb-4">
                  Tentang Pengalaman
                </h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {experience.description}
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Bergabunglah dengan kami dalam petualangan yang tak terlupakan. Kami menyediakan
                  pemandu berpengalaman dan peralatan berkualitas untuk memastikan keselamatan dan
                  kenyamanan Anda selama kegiatan berlangsung.
                </p>
              </motion.div>

              {/* What's Included */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
              >
                <h2 className="text-2xl font-playfair font-bold text-dark-bg mb-6">
                  Yang Termasuk
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {experience.included.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                        <Check size={20} className="text-white" />
                      </div>
                      <span className="font-medium text-dark-bg">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
              >
                <h2 className="text-2xl font-playfair font-bold text-dark-bg mb-6">
                  Persyaratan
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-light-cream rounded-xl">
                    <Zap size={20} className="text-primary-gold mt-0.5" />
                    <div>
                      <p className="font-medium text-dark-bg">Tingkat Kesulitan: {experience.difficulty}</p>
                      <p className="text-sm text-text-secondary mt-1">
                        {experience.difficulty === 'Easy'
                          ? 'Cocok untuk semua usia dan tingkat kebugaran'
                          : experience.difficulty === 'Challenging'
                            ? 'Membutuhkan kondisi fisik yang prima'
                            : 'Membutuhkan kebugaran fisik yang memadai'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-light-cream rounded-xl">
                    <Users size={20} className="text-primary-gold mt-0.5" />
                    <div>
                      <p className="font-medium text-dark-bg">Batas Peserta</p>
                      <p className="text-sm text-text-secondary mt-1">
                        Maksimal {experience.maxParticipants} orang per sesi untuk pengalaman yang lebih personal
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm sticky top-24"
              >
                {/* Price */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <p className="text-text-secondary text-sm mb-1">Harga</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary-gold">
                      {formatPrice(experience.price)}
                    </span>
                    <span className="text-text-secondary">/orang</span>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-text-secondary">Durasi</span>
                    <span className="font-medium text-dark-bg">{experience.duration}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-text-secondary">Kesulitan</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${experience.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        experience.difficulty === 'Challenging' ? 'bg-orange-100 text-orange-700' :
                          'bg-yellow-100 text-yellow-700'
                      }`}>
                      {experience.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-text-secondary">Max Peserta</span>
                    <span className="font-medium text-dark-bg">{experience.maxParticipants} orang</span>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors mb-4"
                >
                  <MessageCircle size={24} />
                  Pesan via WhatsApp
                </a>

                {/* Call Button */}
                <a
                  href={`tel:${settings.contact.phone}`}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-dark-bg font-bold rounded-xl transition-colors"
                >
                  <Phone size={20} />
                  Hubungi Kami
                </a>

                {/* Share & Wishlist */}
                <div className="flex gap-4 mt-6 pt-6 border-t border-gray-100">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 text-text-secondary hover:text-primary-gold transition-colors">
                    <Share2 size={18} />
                    Share
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 text-text-secondary hover:text-red-500 transition-colors">
                    <Heart size={18} />
                    Wishlist
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
