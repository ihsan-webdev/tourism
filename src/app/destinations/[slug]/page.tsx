'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin, Star, Clock, Users, Check, ArrowLeft, Share2, Heart,
  Phone, MessageCircle, Calendar, ChevronRight
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export default function DestinationDetail() {
  const params = useParams();
  const { destinations, settings } = useAppStore();

  const destination = destinations.find(d => d.slug === params.slug);

  if (!destination) {
    notFound();
  }

  // WhatsApp message template
  const waNumber = settings.contact.phone.replace(/[^0-9]/g, '');
  const waMessage = encodeURIComponent(
    `Halo, saya tertarik dengan paket wisata *${destination.name}*.\n\n` +
    `📍 Lokasi: ${destination.location}\n` +
    `💰 Harga: ${formatPrice(destination.price)}\n\n` +
    `Mohon informasi lebih lanjut mengenai:\n` +
    `- Jadwal keberangkatan\n` +
    `- Fasilitas yang termasuk\n` +
    `- Cara pemesanan\n\n` +
    `Terima kasih! 🙏`
  );
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  // Demo images
  const demoImages = [
    '1537996194471-e657a0bdeaaa',
    '1506905925346-21bda4d32df4',
    '1544735716-392fe2489ffa',
    '1528127269322-539801943592',
  ];

  return (
    <main className="min-h-screen bg-light-bg">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-${demoImages[0]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-24 left-0 right-0">
          <div className="container-custom">
            <nav className="flex items-center gap-2 text-white/70 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
              <ChevronRight size={14} />
              <span className="text-white">{destination.name}</span>
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
              <span className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-primary-gold text-dark-bg rounded-full">
                {destination.category}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-4">
                {destination.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{destination.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-primary-gold fill-primary-gold" />
                  <span>{destination.rating} ({destination.reviews} reviews)</span>
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
                  Tentang Destinasi
                </h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {destination.description}
                </p>
                <p className="text-text-secondary leading-relaxed">
                  {destination.shortDescription} Nikmati pengalaman wisata yang tak terlupakan dengan pemandangan
                  alam yang memukau dan budaya lokal yang kaya. Destinasi ini menawarkan berbagai aktivitas
                  menarik untuk semua kalangan usia.
                </p>
              </motion.div>

              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
              >
                <h2 className="text-2xl font-playfair font-bold text-dark-bg mb-6">
                  Highlights
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {destination.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-light-cream rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-primary-gold/20 flex items-center justify-center">
                        <Check size={20} className="text-primary-gold" />
                      </div>
                      <span className="font-medium text-dark-bg">{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
              >
                <h2 className="text-2xl font-playfair font-bold text-dark-bg mb-6">
                  Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {demoImages.map((img, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-xl overflow-hidden"
                    >
                      <div
                        className="w-full h-full bg-cover bg-center hover:scale-110 transition-transform duration-500"
                        style={{
                          backgroundImage: `url('https://images.unsplash.com/photo-${img}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')`,
                        }}
                      />
                    </div>
                  ))}
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
                  <p className="text-text-secondary text-sm mb-1">Mulai dari</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary-gold">
                      {formatPrice(destination.price)}
                    </span>
                    <span className="text-text-secondary">/orang</span>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-light-cream flex items-center justify-center">
                      <Clock size={20} className="text-primary-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Durasi</p>
                      <p className="font-medium text-dark-bg">3-5 Hari</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-light-cream flex items-center justify-center">
                      <Users size={20} className="text-primary-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Group Size</p>
                      <p className="font-medium text-dark-bg">Max 15 orang</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-light-cream flex items-center justify-center">
                      <Calendar size={20} className="text-primary-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Ketersediaan</p>
                      <p className="font-medium text-dark-bg">Setiap Hari</p>
                    </div>
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
